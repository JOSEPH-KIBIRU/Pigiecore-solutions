import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  Check,
  Code2,
  Cpu,
  CreditCard,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  MoveUpRight,
  Network,
  PanelsTopLeft,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OfferPopup from "@/components/offer-popup";
import { SystemCanvas } from "@/components/redesign/system-canvas";
import { siteUrl } from "@/lib/site";
import "./redesign/redesign.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Pigiecore Solutions",
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      image: `${siteUrl}/opengraph-image`,
      description:
        "Custom software development agency in Kenya building dashboards and web applications for real estate, logistics, salons, schools, and hospitals.",
      email: "support@pigiecore.co.ke",
      telephone: "+254798118515",
      areaServed: "Kenya",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+254798118515",
          contactType: "sales",
          areaServed: "KE",
        },
        {
          "@type": "ContactPoint",
          telephone: "+254708769459",
          contactType: "customer support",
          areaServed: "KE",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Real Estate Management Software",
              description: "Property management dashboard for landlords and property managers.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Development",
              description: "Custom business and company websites.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Logistics & Fleet Management",
              description: "Fleet tracking, NTSA compliance, and booking systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Salon & Barber Booking",
              description: "Online booking and client management for salons.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "School Management System",
              description: "Student records, fees, and staff management for schools.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hospital Management System",
              description: "Patient records, appointments, billing, and pharmacy tracking.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pigiecore Solutions",
      description:
        "Custom software development for real estate, logistics, salons, schools, and hospitals.",
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "SteadyCargo ERP",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Logistics and fleet management ERP with real-time GPS tracking, route optimization, NTSA compliance, delivery scheduling, and fuel and maintenance analytics.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "BomaPulse",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Real estate management dashboard with property analytics, lead tracking, investment calculators, tenant management, and smart MLS integrations.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Pigiecore Salon & Barber Booking",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      description:
        "Online appointment scheduling with staff management, payment processing, client history, and inventory tracking for salons and barbershops.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Pigiecore School Management System",
      operatingSystem: "Web",
      applicationCategory: "EducationalApplication",
      description:
        "Complete school operating system with student records, timetables, attendance, grade books, communications, and parent portals.",
      url: `${siteUrl}/#services`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

const services = [
  {
    number: "01",
    title: "Custom software",
    copy: "Your digital solutions should be as unique as your business.",
    icon: Code2,
    accent: "lavender",
  },
  {
    number: "02",
    title: "SaaS products",
    copy: "Enterprise-grade SaaS. Built for scale, security and maintainability.",
    icon: PanelsTopLeft,
    accent: "mint",
  },
  {
    number: "03",
    title: "Web & mobile apps",
    copy: "Fast, responsive digital products that feel as considered on a phone as they do on a desktop.",
    icon: Globe2,
    accent: "peach",
  },
  {
    number: "04",
    title: "Automation & AI",
    copy: "Connect people, systems and AI agents to remove repetitive work and keep operations moving.",
    icon: Bot,
    accent: "blue",
  },
  {
    number: "05",
    title: "Payments & integrations",
    copy: "Seamless M-Pesa & Bank payment integrations.",
    icon: CreditCard,
    accent: "yellow",
  },
  {
    number: "06",
    title: "Modernisation",
    copy: "We breathe new life into your existing workflows, making them secure, scalable, and easy to manage",
    icon: Layers3,
    accent: "pink",
  },
];

const solutionCards = [
  {
    tag: "OPERATIONS",
    title: "Real estate command centre",
    copy: "Listings, leads, investment metrics and follow-up in one live workspace.",
    className: "solution-dark",
    icon: PanelsTopLeft,
  },
  {
    tag: "LOGISTICS",
    title: "Fleet & dispatch control",
    copy: "Live jobs, delivery status, route performance and maintenance signals.",
    className: "solution-light",
    icon: Network,
  },
  {
    tag: "COMMERCE",
    title: "Commerce that closes",
    copy: "Checkout, payments, customer data and operations working as one flow.",
    className: "solution-pink",
    icon: CreditCard,
  },
];

const stack = ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Supabase", "M-Pesa", "AWS"];

const process = [
  ["01", "Discover", "We map the workflow, constraints and outcomes before touching a screen."],
  ["02", "Design", "We turn complexity into a clear information architecture and product system."],
  ["03", "Build", "Small releases, real feedback, production-grade engineering from day one."],
  ["04", "Launch", "Deploy, train, monitor and hand over a system your team can actually use."],
];

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="top" className="site-root redesign-root">
        <div className="h-16" aria-hidden />

        <section className="hero section-shell">
          <div className="hero-copy">
            <h1>Software that makes <span className="hero-italic">complex</span> feel simple.</h1>
            <p className="hero-lead">
              Pigiecore designs and engineers custom software, ERP, E-commerce, SaaS platforms, web apps, automation and integrations that connect the moving parts of your company.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#contact">Start a project <ArrowUpRight size={17} /></a>
              <a className="button-ghost" href="#work">See the work <ArrowRight size={16} /></a>
            </div>
            <div className="hero-meta">
              <div><strong>06+</strong><span>products shipped</span></div>
              <div><strong>24/7</strong><span>support</span></div>
              <div><strong>100%</strong><span>custom built</span></div>
            </div>
          </div>
          <SystemCanvas />
        </section>

        <section className="ticker" aria-label="Capabilities">
          <div className="ticker-track">
            {["Custom Software", "SaaS", "Automation", "Payments", "AI Systems", "Web Apps", "Integrations", "Product Engineering"].map((item) => (
              <span key={item}>{item}<i>✦</i></span>
            ))}
            {["Custom Software", "SaaS", "Automation", "Payments", "AI Systems", "Web Apps", "Integrations", "Product Engineering"].map((item) => (
              <span key={`dup-${item}`}>{item}<i>✦</i></span>
            ))}
          </div>
        </section>

        <section id="services" className="section-shell section-block">
          <div className="section-heading two-col-heading">
            <div>
              <Pill>What we build</Pill>
              <h2>A software partner for the parts of your business that matter.</h2>
            </div>
            <p>
              From custom systems to SaaS platforms and integrations, we build software that fits the way your business works.
            </p>
          </div>

          <div className="service-grid">
            {services.map(({ number, title, copy, icon: Icon, accent }) => (
              <article className={`service-card accent-${accent}`} key={number}>
                <div className="service-top"><span>{number}</span><Icon size={21} /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <a href="#contact">Explore <ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-22.5 md:pb-32.5">
          <div className="grid min-h-147.5 overflow-hidden rounded-[38px] bg-[#101114] text-white lg:grid-cols-[0.9fr_1.1fr]">
            {/* Copy */}
            <div className="flex flex-col justify-center p-7 sm:p-10 md:p-14 lg:p-18">
              <Pill>
                From friction to flow
              </Pill>

              <h2 className="mt-4.5 max-w-172.5 text-[clamp(42px,5.3vw,74px)] font-semibold leading-[0.97] tracking-[-0.07em] text-white">
                Your business already has the pieces. We connect them.
              </h2>

              <p className="mt-5.5 max-w-140 text-[16px] leading-[1.65] text-white/60">
                We turn scattered data, disconnected tools, and messy workflows into one system that helps your team move faster.
              </p>

              <div className="mt-7 grid gap-2.5">
                {[
                  "One source of truth",
                  "Clear operational visibility",
                  "Automated repeatable work",
                  "Room to grow without rewrites",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-[13px] text-white/80"
                  >
                    <Check
                      size={16}
                      className="shrink-0 text-[#9d95ff]"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow */}
            <div className="relative min-h-110 overflow-hidden @container [--core-size:clamp(64px,22cqw,140px)] [--connector-length:clamp(96px,30cqw,210px)] [--horizontal-connector-length:clamp(96px,30cqw,210px)] bg-[radial-gradient(circle_at_50%_50%,rgba(107,92,255,0.18),transparent_36%),linear-gradient(135deg,#17191e,#0d0e10)] sm:min-h-[500px] lg:min-h-[590px]">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b5cff]/10 blur-[80px]" />

              {/* Sales → Unified system */}
              <div
                className="
                  absolute left-1/2 z-[1]
                  top-[calc(50%_-_var(--core-size)/2_-_var(--connector-length))]
                  h-[var(--connector-length)] w-px -translate-x-1/2
                  bg-linear-to-b from-[#8278ff]/80 via-[#8278ff]/40 to-transparent
                "
              />

              {/* Payments → Unified system */}
              <div
                className="
                  absolute left-[calc(50%_-_var(--core-size)/2_-_var(--horizontal-connector-length))]
                  top-1/2 z-[1] h-px w-[var(--horizontal-connector-length)] -translate-y-1/2
                  bg-linear-to-l from-[#8278ff]/80 via-[#8278ff]/40 to-transparent
                "
              />

              {/* Unified system → Data */}
              <div
                className="
                  absolute left-[calc(50%_+_var(--core-size)/2)] top-1/2 z-[1]
                  h-px w-[var(--horizontal-connector-length)] -translate-y-1/2
                  bg-linear-to-r from-[#8278ff]/80 via-[#8278ff]/40 to-transparent
                "
              />

              {/* Unified system → Automation / Data */}
              <div
                className="
                  absolute left-1/2 z-[1]
                  top-[calc(50%_+_var(--core-size)/2)]
                  h-[var(--connector-length)] w-px -translate-x-1/2
                  bg-gradient-to-b from-[#8278ff]/80 via-[#8278ff]/40 to-transparent
                "
              />

              {/* Sales */}
              <div
                className="
                  absolute left-1/2 top-[8%] z-[3]
                  flex -translate-x-1/2 items-center gap-2
                  rounded-[14px] border border-white/10
                  bg-white/[0.06] px-3 py-2.5
                  text-[12px] text-white/85
                  shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                  backdrop-blur-[14px]
                  sm:px-3.5
                  lg:top-[13%]
                "
              >
                <MessageCircle size={15} />
                <span>Sales</span>
              </div>

              {/* Payments */}
              <div
                className="
                  absolute left-[3%] top-1/2 z-[3]
                  flex w-[clamp(88px,18cqw,104px)] -translate-y-1/2 items-center justify-center gap-2
                  rounded-[14px] border border-white/10
                  bg-white/[0.06] px-3 py-2.5
                  text-[12px] text-white/85
                  shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                  backdrop-blur-[14px]
                  sm:left-[7%] lg:left-[12%]
                "
              >
                <CreditCard size={15} />
                <span>Payments</span>
              </div>

              {/* Data */}
              <div
                className="
                  absolute right-[3%] top-1/2 z-[3]
                  flex w-[clamp(88px,18cqw,104px)] -translate-y-1/2 items-center justify-center gap-2
                  rounded-[14px] border border-white/10
                  bg-white/[0.06] px-3 py-2.5
                  text-[12px] text-white/85
                  shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                  backdrop-blur-[14px]
                  sm:right-[7%] lg:right-[10%]
                "
              >
                <Database size={15} />
                <span>Data</span>
              </div>

              {/* Unified system */}
              <div
                className="
                  absolute left-1/2 top-1/2 z-[4]
                  flex size-[var(--core-size)]
                  -translate-x-1/2 -translate-y-1/2
                  flex-col items-center justify-center gap-2
                  rounded-full
                  bg-[radial-gradient(circle_at_30%_25%,#7367ff,#2e2a7f_58%,#161725)]
                  text-center
                  shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_80px_rgba(107,92,255,0.24)]
                "
              >
                <Sparkles size={19} />
                <span className="sm:text-xs text-[7px] text-white">
                  Unified system
                </span>
              </div>

              {/* Automation */}
              <div
                className="
                  absolute bottom-[8%] left-1/2 z-3
                  flex -translate-x-1/2 items-center gap-2
                  rounded-[14px] border border-white/10
                  bg-white/6 px-3 py-2.5
                  text-[12px] text-white/85
                  shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                  backdrop-blur-[14px]
                  lg:bottom-[12%]
                "
              >
                <Workflow size={15} />
                <span>Automation</span>
              </div>

              {/* Decorative grid */}
              <div
                className="
                  pointer-events-none absolute inset-0 opacity-[0.045]
                  bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
                  [bg-size:32px_32px]
                "
              />
            </div>
          </div>
        </section>

        <section id="solutions" className="section-shell section-block">
          <div className="section-heading">
            <Pill>Solutions</Pill>
            <h2>Turn business ideas into working products.</h2>
            <p>Real-world systems designed around the way Kenyan and African teams actually operate.</p>
          </div>

          <div className="solution-grid">
            {solutionCards.map(({ tag, title, copy, className, icon: Icon }, index) => (
              <article key={title} className={`solution-card ${className}`}>
                <div className="solution-topline"><span>{tag}</span><Icon size={17} /></div>
                <div className="solution-visual">
                  <div className="mini-dashboard">
                    <div className="mini-head"><span /><span /><span /></div>
                    <div className="mini-bars"><i /><i /><i /><i /><i /></div>
                    <div className="mini-pills"><b /><b /><b /></div>
                  </div>
                  {index === 0 && <div className="mini-float">+12.4% <span>ROI</span></div>}
                  {index === 1 && (<><div className="route-dot r1" /><div className="route-dot r2" /><div className="route-dot r3" /></>)}
                  {index === 2 && <div className="payment-ring">KES</div>}
                </div>
                <div className="solution-body">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <a href="#contact" className="solution-link">View solution <MoveUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section-shell process-section">
          <div className="section-heading two-col-heading">
            <div><Pill>How we work</Pill><h2>Clarity before complexity.</h2></div>
            <p>Inspired by the best product teams: make the invisible process visible. Every step has a deliverable, an owner and a reason.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, copy]) => (
              <article className="process-card" key={number}>
                <div className="process-number">{number}</div>
                <div className="process-dot" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section-shell work-section">
          <div className="work-intro">
            <div><Pill>Selected build</Pill><h2>One screen can hide a very big system.</h2></div>
            <a href="#contact" className="text-link">Tell us what you are building <ArrowUpRight size={15} /></a>
          </div>
          <article className="case-card">
            <div className="case-copy">
              <span className="case-label">CASE 001 · INTERNAL SYSTEM</span>
              <h3>Operations command centre</h3>
              <p>We imagine the product surface as a calm layer over a complex engine: role-based workspaces, live metrics, customer context, approvals, payments and an audit trail.</p>
              <div className="case-bullets">
                {["Role-based dashboards", "Live operational data", "API-first integrations", "Responsive by default"].map((item) => <span key={item}><Check size={14} /> {item}</span>)}
              </div>
              <a className="button-primary" href="#contact">Discuss your system <ArrowUpRight size={16} /></a>
            </div>
            <div className="case-ui">
              <div className="case-sidebar">
                <div className="case-logo">P</div>
                <span /><span /><span /><span />
              </div>
              <div className="case-main">
                <div className="case-ui-head"><div><span>Monday</span><strong>Operations overview</strong></div><button><Search size={14} /></button></div>
                <div className="case-kpis"><div><small>Active jobs</small><b>128</b><em>+8.6%</em></div><div><small>Cash collected</small><b>KES 4.8M</b><em>+12.4%</em></div><div><small>Exceptions</small><b>07</b><em>Needs review</em></div></div>
                <div className="case-chart"><div className="chart-head"><span>Workflow volume</span><small>Last 30 days</small></div><div className="chart-area"><div className="chart-line" /><div className="chart-grid-lines"><span /><span /><span /><span /></div></div></div>
                <div className="case-table"><div><span>Customer</span><span>Status</span><span>Owner</span></div><div><span>Northstar Ltd</span><strong>Live</strong><span>AM</span></div><div><span>Acme Logistics</span><strong>Review</strong><span>BK</span></div><div><span>Horizon Homes</span><strong>Live</strong><span>CN</span></div></div>
              </div>
            </div>
          </article>
        </section>

        <section id="about" className="section-shell about-section">
          <div className="about-panel">
            <div className="about-glow" />
            <div className="about-copy"><Pill>Built for growth</Pill><h2>Big-system thinking. Human-scale delivery.</h2><p>We combine product thinking, modern engineering and a bias toward clarity. The goal is not more software — it is less friction.</p></div>
            <div className="about-signals">
              <div><BadgeCheck size={18} /><span>Custom architecture</span></div>
              <div><ShieldCheck size={18} /><span>Security-minded by default</span></div>
              <div><Zap size={18} /><span>Performance is a feature</span></div>
            </div>
          </div>
        </section>

        <section className="section-shell stack-section">
          <div className="stack-copy"><Pill>Built with</Pill><h2>A modern stack, chosen for the job.</h2><p>No technology theatre. The right tools, used deliberately.</p></div>
          <div className="stack-grid">{stack.map((item) => <div key={item} className="stack-item"><span className="stack-icon"><Cpu size={16} /></span><span>{item}</span><ArrowUpRight size={14} /></div>)}</div>
        </section>

        <section id="contact" className="cta-section">
          <div className="cta-grid-lines" />
          <div className="cta-inner section-shell">
            <div><span className="cta-kicker">NEXT STEP · 01</span><h2>Have a complex problem? Good.</h2><p>Bring the workflow, the pain point or the rough idea. We will turn it into a clearer product path.</p></div>
            <a href="mailto:support@pigiecore.co.ke" className="cta-button">support@pigiecore.co.ke <ArrowUpRight size={18} /></a>
          </div>
        </section>
      </main>
      <Footer />
      <OfferPopup />
    </>
  );
}
