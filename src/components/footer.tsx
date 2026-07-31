import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
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
              {[
                "Real Estate Dashboard",
                "Website Dev",
                "Logistics & Fleet",
                "Salon Booking",
                "School Mgmt",
                "Hospital Mgmt",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#services"
                    className="text-sm hover:text-sky-400 transition-colors"
                  >
                    {item}
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
                <Link
                  href="#about"
                  className="text-sm hover:text-sky-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-sm hover:text-sky-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-500">
                  Privacy Policy
                </span>
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
                  href="mailto:hello@pigiecoresolutions.com"
                  className="hover:text-sky-400 transition-colors"
                >
                  hello@pigiecoresolutions.com
                </a>
              </li>
              <li className="text-sm">
                <a href="tel:+254798118515" className="hover:text-sky-400 transition-colors">0798118515</a>
              </li>
              <li className="text-sm">
                <a href="tel:+254708469769" className="hover:text-sky-400 transition-colors">0708469769</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pigiecore Solutions. All rights
            reserved.
          </p>
          <p className="text-sm text-slate-500">
            Built with <span className="text-red-400">❤️</span> care at Pigiecore
          </p>
        </div>
      </div>
    </footer>
  );
}