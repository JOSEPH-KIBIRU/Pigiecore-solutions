import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pigiecore Solutions collects, uses, stores, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="January 1, 2026">
      <Section title="1. Introduction">
        <p>
          Pigiecore Solutions ("we", "us", "our") respects your privacy and is
          committed to protecting the personal information you share with us. This
          Privacy Policy explains what information we collect, how we use it, and
          the choices you have regarding your data.
        </p>
        <p>
          By using our website, services, and products, you agree to the practices
          described in this policy.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>We collect information you provide directly to us, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Contact details submitted through our forms, such as your name, email
            address, phone number, and the details of your enquiry.
          </li>
          <li>
            Account information if you create an admin account, including your email
            address and authentication credentials.
          </li>
          <li>
            Project-related data you share with us so we can deliver our services.
          </li>
        </ul>
        <p>
          We also automatically collect limited technical data such as your IP
          address, browser type, and pages visited, to maintain and improve our
          website.
        </p>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Respond to your enquiries and provide quotations.</li>
          <li>Deliver, maintain, and support the software we build for you.</li>
          <li>Send project updates, invoices, and important notices.</li>
          <li>Improve our website, services, and customer experience.</li>
          <li>Comply with legal obligations and protect our rights.</li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>
      </Section>

      <Section title="4. Cookies and Analytics">
        <p>
          Our website uses cookies and similar technologies to store preferences
          (such as your chosen theme) and to understand how visitors use our site.
          You can disable cookies in your browser settings; however, some features
          may not function properly as a result.
        </p>
      </Section>

      <Section title="5. Data Storage and Security">
        <p>
          Your data is stored securely using trusted and reputable service
          providers that maintain industry-standard security measures and data
          protection practices.
        </p>
        <p>
          We apply strict technical and organisational safeguards to protect your
          information, including encrypted transmission, restricted access, and
          continuous monitoring of our infrastructure. Access to your data is
          limited to personnel who need it to deliver our services.
        </p>
        <p>
          We do not disclose the specific infrastructure, hosting providers, or
          deployment locations of our systems, as this is part of our security
          posture. Rest assured that every provider and system we use is held to
          high security and confidentiality standards.
        </p>
      </Section>

      <Section title="6. Security Disclaimer">
        <p>
          While we take strong measures to protect your information, no method of
          transmission over the internet or electronic storage is 100% secure. We
          cannot guarantee absolute security, but we are committed to continuously
          improving our safeguards and acting promptly if a risk is identified.
        </p>
      </Section>

      <Section title="7. Data Retention">
        <p>
          We retain your information only for as long as necessary to fulfil the
          purposes described in this policy, comply with legal requirements, and
          resolve disputes. You may request deletion of your personal data at any
          time.
        </p>
      </Section>

      <Section title="8. Your Rights">
        <p>Depending on applicable law, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction or updating of inaccurate information.</li>
          <li>Request deletion of your personal information.</li>
          <li>Object to or restrict certain processing of your data.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us using the details below. We
          will respond within a reasonable time.
        </p>
      </Section>

      <Section title="9. Children's Privacy">
        <p>
          Our website and services are not directed to children under 13. We do not
          knowingly collect personal information from children.
        </p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The latest version
          will always be published on this page with an updated effective date. We
          encourage you to review this page periodically.
        </p>
      </Section>
    </LegalPage>
  );
}