import Link from "next/link";
import Logo from "@/components/logo";

const SERVICE_LINKS = [
  { label: "Software Development", href: "/services/software-development" },
  { label: "SaaS Development", href: "/services/saas-development" },
  { label: "Web Applications", href: "/services/web-applications" },
  { label: "Business Automation", href: "/services/business-automation" },
  { label: "API & Payment Integrations", href: "/services/api-payment-integrations" },
];

const SOLUTION_LINKS = [
  { label: "Property Management", href: "/solutions/property-management" },
  { label: "Fleet Management", href: "/solutions/fleet-management" },
  { label: "School Management", href: "/solutions/school-management" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Custom Business Systems", href: "/solutions/custom-business-systems" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <Logo size={36} />
              <span className="font-semibold text-lg text-white">
                Pigiecore
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Custom software solutions that help businesses automate, scale,
              and succeed.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-3">
              {SOLUTION_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-sky-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-sky-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-sky-400 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="text-sm hover:text-sky-400 transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm hover:text-sky-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-sky-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="text-sm">
                <a
                  href="mailto:info@pigiecore.co.ke"
                  className="hover:text-sky-400 transition-colors"
                >
                  info@pigiecore.co.ke
                </a>
              </li>
              <li className="text-sm">
                <a href="tel:+254798118515" className="hover:text-sky-400 transition-colors">0798118515</a>
              </li>
              <li className="text-sm">
                <a href="tel:+254708769459" className="hover:text-sky-400 transition-colors">0708769459</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pigiecore Solutions. All rights
            reserved.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            Built with <span className="text-red-400">❤️</span> &amp; care at Pigiecore
          </p>
        </div>
      </div>
    </footer>
  );
}