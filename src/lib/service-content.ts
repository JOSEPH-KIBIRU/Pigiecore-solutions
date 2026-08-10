export type EntryType = "services" | "solutions";

export interface RelatedEntry {
  type: EntryType;
  slug: string;
}

export interface ServiceEntry {
  type: EntryType;
  slug: string;
  name: string;
  icon: string;
  eyebrow: string;
  h1: string;
  tagline: string;
  intro: string[];
  features: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  related: RelatedEntry[];
}

export const SERVICE_ENTRIES: ServiceEntry[] = [
  {
    type: "services",
    slug: "software-development",
    name: "Software Development",
    icon: "code",
    eyebrow: "Services",
    h1: "Custom Software Development",
    tagline:
      "Bespoke desktop and web software engineered for the way your business actually operates.",
    intro: [
      "Off-the-shelf software rarely matches how your team really works. We design and build custom software from the ground up — from the data model to the interface — around your exact workflows, approvals, and reporting needs.",
      "Our engineers handle the entire lifecycle: requirements discovery, architecture, UI/UX design, development, testing, and ongoing maintenance. Every feature ships incrementally so you see working software early and avoid expensive surprises.",
    ],
    features: [
      { title: "Discovery & Architecture", description: "Workshops to map your processes, then a clear technical blueprint before a single line of code." },
      { title: "Modern Tooling", description: "Built with Next.js, TypeScript, and cloud infrastructure that scales as you grow." },
      { title: "Quality & Testing", description: "Automated checks and secure coding practices that protect your data and reputation." },
      { title: "Iterative Delivery", description: "Short release cycles with demo reviews, so you stay in control of scope and budget." },
    ],
    faqs: [
      { q: "How long does custom software take to build?", a: "Most business systems take 6–12 weeks to reach a usable first release, depending on scope. We work in phases and show you progress at every step." },
      { q: "Do I own the software and its source code?", a: "Yes. You own everything we build, including the source code, documentation, and your data — no lock-in." },
      { q: "Can you extend software we already use?", a: "We frequently integrate with and improve existing systems, migrating legacy data into fresh platforms rather than forcing rip-and-replace." },
    ],
    related: [
      { type: "services", slug: "web-applications" },
      { type: "services", slug: "saas-development" },
      { type: "solutions", slug: "custom-business-systems" },
    ],
  },
  {
    type: "services",
    slug: "saas-development",
    name: "SaaS Development",
    icon: "cloud",
    eyebrow: "Services",
    h1: "SaaS Development & Product Engineering",
    tagline:
      "Launch a multi-tenant software product with subscriptions, billing, and analytics — built to be sold, not just used.",
    intro: [
      "Turning an idea into a profitable SaaS product takes more than code — it takes multi-tenant architecture, secure authentication, subscription billing, and usage analytics. That is exactly what we specialise in.",
      "We take your product from MVP to production: tenant isolation, role-based access, payment and invoicing integration, onboarding flows, and the infrastructure that keeps it fast and reliable as your customer base grows.",
    ],
    features: [
      { title: "Multi-Tenant Architecture", description: "One product, many customers — with secure data isolation between every tenant." },
      { title: "Subscriptions & Billing", description: "Plans, invoicing, and payment integrations (including M-Pesa) wired into your workflow." },
      { title: "Analytics Dashboards", description: "Admin views of signups, usage, churn, and revenue so you can make data-driven decisions." },
      { title: "Scale-Ready Infrastructure", description: "Cloud deployments that stay fast whether you have 10 or 10,000 users." },
    ],
    faqs: [
      { q: "Can you build the MVP before I raise funding?", a: "Yes — we specialise in lean MVPs that prove your concept with real users, then scale the product as you grow." },
      { q: "Do you help with ongoing SaaS maintenance?", a: "We offer monthly maintenance plans covering updates, security patches, backups, and new features." },
      { q: "Will the app work on both mobile and desktop?", a: "We build responsive web applications that work beautifully on phones, tablets, and desktops — no separate app stores needed." },
    ],
    related: [
      { type: "services", slug: "software-development" },
      { type: "services", slug: "api-payment-integrations" },
      { type: "solutions", slug: "custom-business-systems" },
    ],
  },
  {
    type: "services",
    slug: "web-applications",
    name: "Web Applications",
    icon: "globe",
    eyebrow: "Services",
    h1: "Web Application Development",
    tagline:
      "Fast, secure, responsive web apps and company websites that turn visitors into customers.",
    intro: [
      "Your website is often the first impression a customer gets. We build modern web applications and marketing sites that load quickly, rank on Google, and reflect your brand.",
      "From company brochure sites to complex dashboards accessed by your team daily, we deliver responsive, accessible, and SEO-ready front-ends backed by clean, maintainable code.",
    ],
    features: [
      { title: "Responsive Design", description: "Pixel-perfect on phones, tablets, laptops, and large screens." },
      { title: "SEO-Ready", description: "Fast loading, semantic markup, structured data, and clean metadata out of the box." },
      { title: "Content Management", description: "Update your own content without touching code — blogs, services, and news with ease." },
      { title: "Analytics & Tracking", description: "Built-in analytics so you can see what visitors do and improve conversions." },
    ],
    faqs: [
      { q: "How long does a website take to build?", a: "A modern business website typically takes 2–4 weeks; larger web applications run 6–12 weeks depending on features." },
      { q: "Will my new site be found on Google?", a: "We build with SEO baked in — fast load times, proper structure, schema markup, and a submitted sitemap." },
      { q: "Can you redesign my current website?", a: "Yes. We can rebuild your existing site, preserve what works, improve speed and design, and keep your content." },
    ],
    related: [
      { type: "services", slug: "software-development" },
      { type: "solutions", slug: "custom-business-systems" },
    ],
  },
  {
    type: "services",
    slug: "business-automation",
    name: "Business Automation",
    icon: "zap",
    eyebrow: "Services",
    h1: "Business Process Automation",
    tagline:
      "Remove repetitive manual work — quotes, follow-ups, reports, and approvals handled automatically.",
    intro: [
      "Most businesses lose hours every week to spreadsheet gymnastics and manual hand-offs. Automation turns those repetitive tasks into reliable, traceable workflows.",
      "We automate quote generation, invoice reminders, lead routing, report scheduling, and data syncing between the tools you already use — so your team can focus on work that actually moves the business.",
    ],
    features: [
      { title: "Workflow Design", description: "We map your current process and rebuild it as an automated, auditable flow." },
      { title: "Integrations", description: "Connect email, accounting, spreadsheets, and CRMs so data moves automatically." },
      { title: "Scheduled Reports", description: "Daily, weekly, or monthly reports delivered straight to your inbox." },
      { title: "Error Reduction", description: "Eliminate duplicate entry and manual mistakes that cause lost revenue." },
    ],
    faqs: [
      { q: "Which processes can be automated?", a: "Any repeatable task — invoicing, reminders, data entry, reporting, approval chains, and follow-up emails are the most common wins." },
      { q: "Will automation replace my staff?", a: "No. Automation removes tedious work so your team can focus on customers, sales, and growth." },
      { q: "Can automation work with my existing tools?", a: "Almost always. We connect whatever you already use — Excel, M-Pesa statements, email, and accounting packages." },
    ],
    related: [
      { type: "services", slug: "api-payment-integrations" },
      { type: "services", slug: "saas-development" },
    ],
  },
  {
    type: "services",
    slug: "api-payment-integrations",
    name: "API & Payment Integrations",
    icon: "creditcard",
    eyebrow: "Services",
    h1: "API & Payment Integrations",
    tagline:
      "Connect your systems and accept payments — M-Pesa, cards, and bank integrations — without the headache.",
    intro: [
      "Your business depends on systems talking to each other. Whether it's syncing your website with your accounting package or accepting mobile money, we build the integrations that make it effortless.",
      "We provide robust, documented API integrations including M-Pesa Daraja API, card payments, SMS, email, and third-party services — secured and monitored just like our own products.",
    ],
    features: [
      { title: "M-Pesa Daraja Integration", description: "STK push, payouts, reconciliations, and transaction status callbacks done right." },
      { title: "Payment Gateways", description: "Card and mobile payment acceptance with automatic invoice reconciliation." },
      { title: "Third-Party APIs", description: "SMS, email, maps, and accounting integrations that save weeks of manual work." },
      { title: "Webhooks & Sync", description: "Real-time data flow between your apps with retry and monitoring built in." },
    ],
    faqs: [
      { q: "Can you integrate M-Pesa into our existing system?", a: "Yes. We integrate the Daraja API with STK push for payments and payouts, including Paybill configuration and transaction reconciliation." },
      { q: "Are API integrations secure?", a: "We follow strict security practices — encrypted keys, access controls, and audit logging on every integration." },
      { q: "How long does a typical integration take?", a: "Most standard integrations take 1–2 weeks; complex multi-system automations take longer depending on scope." },
    ],
    related: [
      { type: "services", slug: "business-automation" },
      { type: "solutions", slug: "custom-business-systems" },
    ],
  },
  {
    type: "solutions",
    slug: "property-management",
    name: "Property Management",
    icon: "building",
    eyebrow: "Solutions",
    h1: "Property Management Software",
    tagline:
      "Track units, tenants, rent, and maintenance in one dashboard designed for Kenyan landlords and agents.",
    intro: [
      "Managing multiple units means juggling tenants, rent payments, maintenance requests, and policies — usually across spreadsheets and paper. Our property management platform puts all of it in one place.",
      "Landlords and agents get live units, rent tracking with M-Pesa reconciliation, automated rent reminders, tenant records, expense tracking, and downloadable reports for owners or auditors.",
    ],
    features: [
      { title: "Unit & Tenant Ledgers", description: "Vacancies, occupancies, agreements, and rent history for every unit." },
      { title: "M-Pesa Rent Reconciliation", description: "Match tenant M-Pesa payments to accounts automatically." },
      { title: "Automated Reminders", description: "SMS/email rent reminders and late-payment alerts, on schedule." },
      { title: "Owner Reports", description: "Monthly statements, arrears, and expense summaries per property or portfolio." },
    ],
    faqs: [
      { q: "Does it work for both landlords and agents?", a: "Yes — property owners, letting agents, and property managers all get role-based views of the same data." },
      { q: "How are M-Pesa rent payments handled?", a: "Payments via Paybill/Buy Goods are automatically matched to the correct tenant and unit, so your ledger is always current." },
      { q: "Can tenants use it?", a: "Tenants can get a simple portal or SMS flow to view statements and pay rent on time." },
    ],
    related: [
      { type: "solutions", slug: "custom-business-systems" },
      { type: "services", slug: "business-automation" },
    ],
  },
  {
    type: "solutions",
    slug: "fleet-management",
    name: "Fleet Management",
    icon: "truck",
    eyebrow: "Solutions",
    h1: "Fleet & Logistics Management Software",
    tagline:
      "Live vehicle tracking, route optimisation, and maintenance logs that cut fuel and idle time.",
    intro: [
      "Fleet owners lose money to invisible problems — fuel theft, unauthorised routes, overdue servicing, and idle assets. Our fleet platform surfaces every one of them.",
      "Track vehicles live on a map, see trip and fuel reports, schedule maintenance, manage drivers, and plan deliveries. From a single dashboard you control the whole fleet, on any device.",
    ],
    features: [
      { title: "Live GPS Tracking", description: "Real-time vehicle locations, speed, and route history on an interactive map." },
      { title: "Fuel & Idling Reports", description: "Spot excessive idling, detours, and fuel anomalies before they cost you." },
      { title: "Maintenance Scheduling", description: "Service reminders, repair logs, and cost-per-vehicle records." },
      { title: "Delivery Planning", description: "Optimise routes and schedules so drivers complete more jobs per day." },
    ],
    faqs: [
      { q: "Do I need special hardware for tracking?", a: "We support standard GPS tracking devices, or we can advise on simple, affordable hardware to install." },
      { q: "Can it integrate with my existing delivery notes?", a: "Yes — trips and deliveries can be logged against your own consignment or work-order numbers." },
      { q: "Is it suitable for a small fleet?", a: "Absolutely. The platform works for a single vehicle or a hundred, and scales with you." },
    ],
    related: [
      { type: "solutions", slug: "custom-business-systems" },
      { type: "services", slug: "api-payment-integrations" },
    ],
  },
  {
    type: "solutions",
    slug: "school-management",
    name: "School Management",
    icon: "graduationcap",
    eyebrow: "Solutions",
    h1: "School Management System",
    tagline:
      "Students, fees, grades, attendance, and parent communication — one system for your whole school.",
    intro: [
      "Running a school means coordinating students, teachers, fees, timetables, and parents every single day. Paper and separate spreadsheets make it chaotic — and let arrears slip.",
      "Our school management system centralises student records, class scheduling, attendance, grading, fee tracking with M-Pesa, and parent notifications, so staff and parents stay in sync.",
    ],
    features: [
      { title: "Student Records", description: "Admissions, classes, documents, and full academic history per student." },
      { title: "Fee Management", description: "Tuition tracking, M-Pesa payments, statements, and automatic arrears reporting." },
      { title: "Attendance & Exams", description: "Register attendance and record marks with automatic report cards." },
      { title: "Parent Portal", description: "Parents see fees, results, and announcements — reducing call volume." },
    ],
    faqs: [
      { q: "Can multiple campuses use it?", a: "Yes, the platform supports multiple branches and roles such as bursar, teachers, and headteacher." },
      { q: "How do school fees get tracked?", a: "Fees are linked to each student with M-Pesa payment matching, balances, and automatic reminders." },
      { q: "Can teachers use it on phones?", a: "Yes — attendance and marks can be entered from any phone or computer." },
    ],
    related: [
      { type: "solutions", slug: "custom-business-systems" },
      { type: "services", slug: "business-automation" },
    ],
  },
  {
    type: "solutions",
    slug: "healthcare",
    name: "Healthcare",
    icon: "heartpulse",
    eyebrow: "Solutions",
    h1: "Healthcare & Hospital Management Software",
    tagline:
      "Patient records, appointments, billing, pharmacy, and lab — organised for clinics and hospitals.",
    intro: [
      "Healthcare facilities juggle patient records, appointment books, billing, pharmacy stock, and lab results. When these are separate, care slows down and revenue leaks.",
      "We build hospital management systems that keep patient history, scheduling, billing, pharmacy, and lab reporting under one secure, role-based platform — designed to meet the compliance needs of private and public facilities.",
    ],
    features: [
      { title: "Electronic Patient Records", description: "Secure, complete patient histories accessible by authorised staff only." },
      { title: "Appointments & Queueing", description: "Booking, triage, and queue management for doctors and departments." },
      { title: "Billing & NHIF", description: "Invoices, NHIF claims, and payment reconciliation in one workflow." },
      { title: "Pharmacy & Lab", description: "Stock tracking, prescriptions, and lab request/result flows." },
    ],
    faqs: [
      { q: "Is the system secure and confidential?", a: "Yes — role-based access, encrypted storage, and audit logs keep patient data protected." },
      { q: "Can it handle NHIF claims?", a: "We build billing flows that support NHIF and private insurance claims alongside cash payments." },
      { q: "Is it suitable for a small clinic?", a: "Definitely. It works for a single-doctor clinic and scales to multi-department facilities." },
    ],
    related: [
      { type: "solutions", slug: "custom-business-systems" },
      { type: "services", slug: "software-development" },
    ],
  },
  {
    type: "solutions",
    slug: "custom-business-systems",
    name: "Custom Business Systems",
    icon: "settings",
    eyebrow: "Solutions",
    h1: "Custom Business Systems",
    tagline:
      "Internal tools, CRMs, reporting suites, and anything else that gives your business an edge.",
    intro: [
      "Every successful business has systems the market never built for them. If a workflow runs on paper, email chains, or a personal spreadsheet, it's a candidate for a custom system.",
      "We build internal tools, CRMs, inventory systems, reporting dashboards, and niche platforms for industries with no good off-the-shelf option — tailored to your team and your data.",
    ],
    features: [
      { title: "Requirements Discovery", description: "We start by understanding your exact workflow before designing anything." },
      { title: "Data & Reporting", description: "Dashboards and exports built around the decisions you actually make." },
      { title: "Team-Only Access", description: "Role-based permissions so the right people see the right data." },
      { title: "Ongoing Evolution", description: "Systems that grow as you do, with new features added as you need them." },
    ],
    faqs: [
      { q: "When does a business need a custom system?", a: "When your team is doing the same data-entry, searching, or reporting repeatedly — or when off-the-shelf tools can't model your industry." },
      { q: "How much does a custom system cost?", a: "Cost depends on scope. We give a fixed quote after discovery, with phased payments aligned to milestones." },
      { q: "What support do you offer after launch?", a: "Training, documentation, and maintenance packages — with our sub-24-hour response commitment." },
    ],
    related: [
      { type: "services", slug: "software-development" },
      { type: "services", slug: "business-automation" },
    ],
  },
];

export function getAllSlugs(type: EntryType): string[] {
  return SERVICE_ENTRIES.filter((e) => e.type === type).map((e) => e.slug);
}

export function getEntry(type: EntryType, slug: string): ServiceEntry | undefined {
  return SERVICE_ENTRIES.find((e) => e.type === type && e.slug === slug);
}