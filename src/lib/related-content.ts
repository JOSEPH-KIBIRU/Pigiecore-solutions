interface RelatedItem {
  label: string;
  href: string;
  keywords: string[];
}

const RELATED_ITEMS: RelatedItem[] = [
  {
    label: "Property Management",
    href: "/solutions/property-management",
    keywords: ["property", "real estate", "landlord", "rent", "tenant", "mortgage"],
  },
  {
    label: "Fleet & Logistics",
    href: "/solutions/fleet-management",
    keywords: ["fleet", "logistics", "delivery", "gps", "transport", "courier", "ntsa"],
  },
  {
    label: "School Management",
    href: "/solutions/school-management",
    keywords: ["school", "student", "education", "classroom", "tuition", "exam", "campus"],
  },
  {
    label: "Healthcare Software",
    href: "/solutions/healthcare",
    keywords: ["hospital", "clinic", "healthcare", "patient", "medical", "pharmacy", "nhif"],
  },
  {
    label: "Office Manager",
    href: "/solutions/office-management",
    keywords: ["office", "staff", "employee", "leave", "attendance", "hr", "meeting"],
  },
  {
    label: "Salon & Barber Booking",
    href: "/services/web-applications",
    keywords: ["salon", "barber", "booking", "appointment", "hair"],
  },
  {
    label: "Custom Software",
    href: "/services/software-development",
    keywords: ["software", "application", "dashboard", "system", "erp", "crm"],
  },
  {
    label: "Web Applications",
    href: "/services/web-applications",
    keywords: ["website", "web app", "webapp", "ecommerce", "online store", "seo"],
  },
  {
    label: "Business Automation",
    href: "/services/business-automation",
    keywords: ["automation", "workflow", "process", "reporting", "paperwork"],
  },
  {
    label: "Payments & API Integrations",
    href: "/services/api-payment-integrations",
    keywords: ["mpesa", "payment", "integration", "api", "stripe", "sms", "daraja"],
  },
];

export function findRelated(
  title: string,
  content: string | null | undefined
): RelatedItem[] {
  const text = `${title} ${content ?? ""}`.toLowerCase();
  const scored = RELATED_ITEMS.map((item) => ({
    item,
    score: item.keywords.reduce((sum, k) => sum + (text.includes(k) ? 1 : 0), 0),
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return (scored.length ? scored : RELATED_ITEMS).slice(0, 3);
}
