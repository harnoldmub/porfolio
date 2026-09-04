"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MODEL = "/assets/3d/chrome-ring.glb";
const POSTER = "/assets/3d/chrome-ring.webp";

/**
 * The hero's signature object: a machined chrome ring lit by a procedural
 * studio environment. It answers to the pointer (a few degrees of tilt) and to
 * scroll velocity (a short spin impulse) — nothing else moves it.
 *
 * It is a progressive enhancement in the strict sense: the still frame renders
 * first and becomes a subtle animated fallback on low-core machines or if
 * WebGL fails. Three.js is only fetched once we have decided the canvas is
 * worth it, and never blocks first paint.
 */
export default function ChromeRing() {
  const host = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch is not a reason to stand still — it only changes how the ring is
    // driven and how hard it is allowed to push the GPU.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const weak = (navigator.hardwareConcurrency ?? 4) < 4 || (memory !== undefined && memory < 3);
    if (reduced || weak) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed || !host.current) return;

      const el = host.current;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          // MSAA is the single most expensive setting on a phone GPU; the
          // higher pixel density covers the edges well enough without it.
          antialias: !touch,
          powerPreference: touch ? "default" : "high-performance",
        });
      } catch {
        return; // no WebGL — the still frame stays
      }

      const size = () => ({ w: el.clientWidth, h: el.clientHeight });
      const { w, h } = size();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, touch ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
      camera.position.set(0, 0, 8.4);

      // --- Procedural studio environment -----------------------------------
      // Chrome is entirely reflection, so the environment *is* the material.
      // A handful of soft bands on a dark ground reads as a photo studio and
      // costs one 512×256 canvas instead of an HDR download.
      const env = document.createElement("canvas");
      env.width = 512;
      env.height = 256;
      const ctx = env.getContext("2d")!;
      const sky = ctx.createLinearGradient(0, 0, 0, 256);
      sky.addColorStop(0, "#3a3a42");
      sky.addColorStop(0.42, "#141418");
      sky.addColorStop(0.58, "#0a0a0c");
      sky.addColorStop(1, "#26262c");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 512, 256);

      // Softboxes. Chrome has no colour of its own, so these bands are the
      // only thing the visitor actually sees on the surface.
      const band = (x: number, y: number, bw: number, bh: number, alpha: number) => {
        const g = ctx.createLinearGradient(x, y, x, y + bh);
        g.addColorStop(0, "rgba(242,240,234,0)");
        g.addColorStop(0.5, `rgba(242,240,234,${alpha})`);
        g.addColorStop(1, "rgba(242,240,234,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x, y, bw, bh);
      };
      band(0, 0, 512, 96, 1);       // key softbox, wraps the whole horizon
      band(0, 96, 512, 26, 0.35);   // spill under the key
      band(40, 150, 190, 34, 0.55); // left kicker
      band(300, 138, 170, 28, 0.45); // right kicker
      band(0, 232, 512, 30, 0.3);   // floor bounce

      // One blue slice, deliberately narrow: the accent should catch the eye
      // as the ring turns, not tint the whole object.
      const accent = ctx.createLinearGradient(0, 186, 0, 226);
      accent.addColorStop(0, "rgba(36,93,255,0)");
      accent.addColorStop(0.5, "rgba(36,93,255,0.9)");
      accent.addColorStop(1, "rgba(36,93,255,0)");
      ctx.fillStyle = accent;
      ctx.fillRect(196, 186, 130, 40);

      const envTex = new THREE.CanvasTexture(env);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      envTex.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envRT = pmrem.fromEquirectangular(envTex);
      scene.environment = envRT.texture;
      envTex.dispose();
      pmrem.dispose();

      const key = new THREE.DirectionalLight(0xf2f0ea, 2.2);
      key.position.set(3, 5, 6);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xf2f0ea, 0.7);
      fill.position.set(-5, -2, 3);
      if (!touch) scene.add(fill); // one less light to evaluate per fragment
      const rim = new THREE.PointLight(0x245dff, 9, 16);
      rim.position.set(-3.4, -1.2, -2.4);
      scene.add(rim);

      // --- Model ------------------------------------------------------------
      const group = new THREE.Group();
      scene.add(group);

      const gltf = await new GLTFLoader().loadAsync(MODEL).catch(() => undefined);
      if (disposed || !gltf) {
        renderer.dispose();
        return;
      }

      const ring = gltf.scene;
      const material = new THREE.MeshStandardMaterial({
        color: 0xdcdee4,
        metalness: 1,
        roughness: 0.19,
        envMapIntensity: 1.9,
      });
      ring.traverse((child) => {
        const mesh = child as import("three").Mesh;
        if (mesh.isMesh) {
          mesh.material = material;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
        }
      });

      // Normalise whatever the export was authored at into a 1-unit object.
      const box = new THREE.Box3().setFromObject(ring);
      const extent = box.getSize(new THREE.Vector3()).length();
      const centre = box.getCenter(new THREE.Vector3());
      ring.position.sub(centre);
      ring.scale.setScalar(5.6 / extent);
      group.add(ring);
      setLive(true);

      // --- Interaction ------------------------------------------------------
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      let spin = 0;              // scroll-velocity impulse
      let lastScroll = window.scrollY;
      let visible = true;
      const clock = new THREE.Clock();

      const onPointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      };
      const onScroll = () => {
        const y = window.scrollY;
        spin += (y - lastScroll) * 0.00055;
        lastScroll = y;
      };
      const onResize = () => {
        const { w: nw, h: nh } = size();
        if (!nw || !nh) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };

      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);

      const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), {
        rootMargin: "120px",
      });
      io.observe(el);

      // A backgrounded tab should not keep a phone's GPU awake.
      const onVisibility = () => {
        if (document.hidden) clock.stop();
        else clock.start();
      };
      document.addEventListener("visibilitychange", onVisibility);

      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;                       // off-screen costs nothing
        const dt = Math.min(clock.getDelta(), 0.05);

        const t = clock.elapsedTime;

        // Without a pointer the ring drives itself: two slow, out-of-phase
        // waves standing in for the parallax, so it never sits still.
        const driftX = touch ? Math.sin(t * 0.23) * 0.6 : pointer.x;
        const driftY = touch ? Math.cos(t * 0.19) * 0.5 : pointer.y;

        eased.x += (driftX - eased.x) * 0.045;
        eased.y += (driftY - eased.y) * 0.045;
        spin *= 0.94;                                // impulse decays

        group.rotation.y += dt * (touch ? 0.22 : 0.16) + spin;
        group.rotation.x = eased.y * 0.26;
        group.rotation.z = -eased.x * 0.12;
        group.position.x = eased.x * 0.34;
        group.position.y = -eased.y * 0.22 + Math.sin(t * 0.55) * 0.09;

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        material.dispose();
        key.dispose();
        fill.dispose();
        rim.dispose();
        envRT.texture.dispose();
        ring.traverse((child) => {
          const mesh = child as import("three").Mesh;
          if (mesh.isMesh) mesh.geometry.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // A plain timeout rather than requestIdleCallback: idle callbacks are
    // queued behind the load event, and a single slow image would then keep
    // the ring from ever starting. Three.js is a dynamic import either way,
    // so it can never delay first paint.
    const timer = window.setTimeout(() => {
      boot().catch(() => undefined); // any failure leaves the still frame up
    }, 350);

    return () => {
      disposed = true;
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div ref={host} className="absolute inset-0" />
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 46vw"
        className={`object-contain transition-opacity duration-700 ease-expo ${
          live ? "opacity-0" : "ring-fallback-drift opacity-100"
        }`}
      />
    </div>
  );
}
