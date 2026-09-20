"use client";

import { useState, FormEvent } from "react";

const socialChannels = [
  { label: "Instagram", href: "https://www.instagram.com/sachin_kandel45/", handle: "@sachin_kandel45" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCcJOh7WbGlGIOHMvAfE5W1Q", handle: "Sachin Kandel" },
  { label: "TikTok", href: "https://www.tiktok.com/@sachin.kandel7", handle: "@sachin.kandel7" },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F3EFE7] text-[#22201c]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 pb-28">

        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c]">
            GET IN TOUCH
          </p>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl italic leading-tight text-[#22201c] mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-[15px] leading-relaxed text-[#555048]">
            Questions, collaborations, photography enquiries, or just want to say hello — I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="border-b border-[#22201c]/20 bg-transparent py-3 text-[15px] text-[#22201c] placeholder:text-[#c4b9a8] focus:border-[#22201c] focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-b border-[#22201c]/20 bg-transparent py-3 text-[15px] text-[#22201c] placeholder:text-[#c4b9a8] focus:border-[#22201c] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="What&apos;s this about?"
                required
                className="border-b border-[#22201c]/20 bg-transparent py-3 text-[15px] text-[#22201c] placeholder:text-[#c4b9a8] focus:border-[#22201c] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Tell me a bit more..."
                required
                className="resize-none border-b border-[#22201c]/20 bg-transparent py-3 text-[15px] text-[#22201c] placeholder:text-[#c4b9a8] focus:border-[#22201c] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 rounded-full bg-[#22201c] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#3a3730] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <svg className="transition-opacity duration-200 group-hover:opacity-70" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {status === "success" && (
                <p className="mt-4 text-sm text-green-700">Message sent — I&apos;ll get back to you soon!</p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-700">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Email</p>
              <a
                href="mailto:sachinkandel89@gmail.com"
                className="font-[var(--font-display)] text-[19px] text-[#22201c] border-b border-transparent hover:border-[#22201c] transition-colors pb-0.5"
              >
                sachinkandel89@gmail.com
              </a>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Based in</p>
              <p className="font-[var(--font-display)] text-[19px] text-[#22201c]">Nepal &amp; Australia</p>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a3947c]">Find me online</p>
              <div className="flex flex-col gap-3">
                {socialChannels.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-[#22201c]/10 pb-2 hover:border-[#22201c]/30 transition-colors"
                  >
                    <span className="text-[14px] text-[#22201c] font-medium">{s.label}</span>
                    <span className="text-[12px] text-[#a3947c] group-hover:text-[#22201c] transition-colors">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#22201c]/10 bg-[#f0ebe0] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a3947c] mb-2">Response time</p>
              <p className="text-[14px] text-[#555048] leading-relaxed">
                I typically respond within 2–3 business days. For urgent photography enquiries, please mention it in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
