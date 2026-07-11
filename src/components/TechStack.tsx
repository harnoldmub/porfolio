import Image from "next/image";

import { techStack } from "@/data/profile";

export default function TechStack() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-3 lg:grid-cols-4">
      {techStack.map((technology) => (
        <div
          key={technology.name}
          className="flex min-h-24 items-center gap-3 bg-[#f7f8f5] px-4 py-5 transition hover:bg-white"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-white p-2 ring-1 ring-black/8">
            <Image src={technology.icon} alt="" width={24} height={24} />
          </span>
          <span className="text-sm font-semibold text-black/72">{technology.name}</span>
        </div>
      ))}
    </div>
  );
}
