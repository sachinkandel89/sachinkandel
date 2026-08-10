"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    );

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
        console.log(result);
      }
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#F3EFE7] font-[var(--font-geist-sans)]">
      <div className="relative mx-auto min-h-screen w-full max-w-[1200px] px-4 py-24 sm:px-6 sm:py-28 md:px-8 md:pl-24 lg:px-10 lg:py-32 lg:pl-40">
        <div className="mb-4 text-center">
          <h1 className="font-[var(--font-display)] text-[clamp(2.2rem,8vw,4.4rem)] italic leading-none text-[#22201c]">
            Get in touch
          </h1>
        </div>

        <p className="mb-10 text-center text-[14px] text-[#8a8578] sm:mb-16 sm:text-[15px] lg:mb-20">
          Questions, collaborations, or just want to say hello.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-10 sm:mb-20 md:gap-14 lg:mb-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#22201c]">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-[#22201c]">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#22201c]">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                placeholder="What's this about?"
                required
                className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-[#22201c]">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me a bit more..."
                required
                className="resize-none border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22201c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3a3730] disabled:opacity-60 sm:w-fit sm:justify-start"
            >
              {status === "sending" ? "Sending..." : "Send message"}

              <svg
                className="transition-transform duration-200 group-hover:translate-x-1"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {status === "success" && (
              <p className="text-sm text-green-700">
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-700">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          <div className="flex flex-col gap-8 sm:gap-10">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">
                Email
              </p>

              <p className="font-[var(--font-display)] text-[20px] text-[#22201c]">
                sachinkandel89@gmail.com
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">
                Based in
              </p>

              <p className="font-[var(--font-display)] text-[20px] text-[#22201c]">
                Kathmandu, Nepal
              </p>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">
                Response time
              </p>

              <p className="text-[15px] leading-relaxed text-[#4a4740]">
                I usually reply within two to three days. For urgent matters,
                mention it in the subject line.
              </p>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">
                Elsewhere
              </p>

              <div className="flex flex-col gap-2 text-[15px] text-[#22201c]">
                <a
                  href="https://www.instagram.com/sachin_kandel45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]"
                >
                  Instagram
                </a>

                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]"
                >
                  Twitter / X
                </a>

                <a
                  href="https://www.tiktok.com/@sachin.kandel7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]"
                >
                  Tiktok
                </a>
                <a
                  href="https://www.youtube.com/channel/UCcJOh7WbGlGIOHMvAfE5W1Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]"
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
