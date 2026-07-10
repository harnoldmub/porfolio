"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

import { profile } from "@/data/profile";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const lines = [
      `Nom: ${name}`,
      `Email: ${email}`,
      "",
      message || "Bonjour Arnold,",
    ];

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || "Prise de contact depuis le site portfolio",
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2.2rem] bg-white p-8 shadow-xl shadow-slate-950/5 ring-1 ring-black/8 sm:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Nom</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#356dff] focus:bg-white focus:ring-2 focus:ring-[#356dff]/20"
            placeholder="Votre nom"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#356dff] focus:bg-white focus:ring-2 focus:ring-[#356dff]/20"
            placeholder="vous@entreprise.com"
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sujet</span>
        <input
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#356dff] focus:bg-white focus:ring-2 focus:ring-[#356dff]/20"
          placeholder="Mission, échange, collaboration..."
        />
      </label>

      <label className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Message</span>
        <textarea
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-3xl border border-black/10 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#356dff] focus:bg-white focus:ring-2 focus:ring-[#356dff]/20"
          placeholder="Décrivez votre contexte, votre équipe ou le besoin à couvrir."
        />
      </label>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">
          Ouvre un email depuis votre messagerie.
        </p>
        <button
          type="submit"
          className="cta-blue inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
        >
          Préparer l&apos;email
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
