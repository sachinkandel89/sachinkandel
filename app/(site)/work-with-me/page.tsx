import Link from "next/link";

const services = [
  {
    id: "photography",
    title: "Photography",
    tagline: "Sajha Moments Photography",
    description:
      "Travel, portrait, event, and documentary photography. I tell stories through images — capturing the quiet, the human, and the extraordinary. Based in Australia with availability for travel assignments.",
    offerings: [
      "Travel & destination photography",
      "Portrait & personal branding sessions",
      "Event coverage & documentary",
      "Photo essays for brands & publications",
    ],
    cta: { label: "View Portfolio", href: "/photography" },
  },
  {
    id: "brand-collaborations",
    title: "Brand Collaborations",
    tagline: "Authentic storytelling for your brand",
    description:
      "I partner with travel, lifestyle, finance, and migration-focused brands to create content that resonates with the Nepali diaspora and migrant communities in Australia and beyond.",
    offerings: [
      "Sponsored blog posts & long-form content",
      "Social media content & reels",
      "Product & experience reviews",
      "Email newsletter sponsorships",
    ],
    cta: { label: "Get In Touch", href: "/contact" },
  },
  {
    id: "speaking",
    title: "Speaking",
    tagline: "Sharing the migrant experience",
    description:
      "I speak on topics including the Nepali migrant experience in Australia, personal finance for new arrivals, travel storytelling, and building a digital presence as a creator.",
    offerings: [
      "Community events & panel discussions",
      "University & cultural group talks",
      "Podcast & YouTube interviews",
      "Webinars for migrant communities",
    ],
    cta: { label: "Invite Me to Speak", href: "/contact" },
  },
  {
    id: "partnerships",
    title: "Partnerships",
    tagline: "Let's build something together",
    description:
      "Open to long-term partnerships with travel companies, migration services, financial products, and organisations that genuinely serve the Nepali and South Asian community.",
    offerings: [
      "Ambassador & advocacy roles",
      "Affiliate & referral programmes",
      "Co-created guides & resource hubs",
      "Cross-promotion with aligned creators",
    ],
    cta: { label: "Discuss a Partnership", href: "/contact" },
  },
];

const stats = [
  { value: "5K+", label: "Monthly readers" },
  { value: "1.5K+", label: "YouTube subscribers" },
  { value: "500+", label: "Instagram followers" },
  { value: "3+", label: "Years of content" },
];

export const metadata = {
  title: "Work With Me — Sachin Kandel",
  description: "Photography, brand collaborations, speaking, and partnerships with Sachin Kandel.",
};

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen w-full bg-[#F3EFE7] text-[#22201c]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 pb-28">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c]">
            WORK WITH ME
          </p>
          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl italic leading-tight text-[#22201c] mb-5">
            Let&apos;s create something meaningful.
          </h1>
          <p className="text-[15px] leading-relaxed text-[#555048]">
            I believe the best collaborations happen when values align. Whether you&apos;re a brand, organisation, or fellow creator — here&apos;s how we can work together.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="mb-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[16px] border border-[#22201c]/15 bg-[#f7efe3] px-5 py-5 text-center"
            >
              <p className="font-[var(--font-display)] text-2xl sm:text-3xl font-medium text-[#22201c] mb-1">
                {s.value}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#a3947c]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col rounded-[20px] border border-[#22201c]/15 bg-[#f7efe3] p-7 sm:p-8 shadow-[0_8px_30px_rgba(34,32,28,0.04)] transition-opacity duration-300 hover:opacity-95"
            >
              <div className="mb-4 flex items-center gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3947c]">
                    {service.tagline}
                  </p>
                  <h2 className="font-[var(--font-display)] text-xl sm:text-2xl font-medium text-[#22201c]">
                    {service.title}
                  </h2>
                </div>
              </div>

              <p className="text-[14px] leading-relaxed text-[#555048] mb-5">
                {service.description}
              </p>

              <div className="mb-6 flex-grow">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a3947c] mb-2.5">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-1.5">
                  {service.offerings.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[#555048]">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a3947c]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={service.cta.href}
                className="self-start inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#22201c] border-b border-[#22201c]/30 pb-0.5 hover:border-[#22201c] transition-colors"
              >
                {service.cta.label} &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-[20px] border border-[#22201c]/15 bg-[#f7efe3] p-8 sm:p-10">
          <div className="max-w-xl mb-6">
            <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl italic text-[#22201c] mb-3">
              Ready to start a conversation?
            </h3>
            <p className="text-[14px] leading-relaxed text-[#555048]">
              Send me a message with a bit about yourself and what you have in mind. I reply to every genuine enquiry and look forward to hearing from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#22201c] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/90"
            >
              Send a Message &rarr;
            </Link>
            <a
              href="mailto:sachinkandel89@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-[#22201c]/25 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#22201c] transition-all hover:bg-[#22201c]/5"
            >
              sachinkandel89@gmail.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
