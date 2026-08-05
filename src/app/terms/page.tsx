import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing the use of Pigiecore Solutions' website and services.",
  alternates: { canonical: "/terms" },
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

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="January 1, 2026">
      <Section title="1. Agreement to Terms">
        <p>
          These Terms & Conditions ("Terms") govern your use of the Pigiecore
          Solutions website and services. By accessing our website or engaging our
          services, you agree to be bound by these Terms. If you do not agree, please
          do not use our services.
        </p>
      </Section>

      <Section title="2. Our Services">
        <p>
          Pigiecore Solutions provides custom software development services,
          including web applications, dashboards, and management systems for real
          estate, logistics, salons, schools, and hospitals. Specific deliverables,
          timelines, and fees for each project are set out in a separate proposal or
          agreement signed by both parties.
        </p>
      </Section>

      <Section title="3. Project Engagement and Client Responsibilities">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The client agrees to provide accurate requirements, feedback, and
            necessary access in a timely manner so we can complete the project.
          </li>
          <li>
            Delays caused by missing information or feedback may affect the agreed
            timeline.
          </li>
          <li>
            The client is responsible for providing all content, branding, and data
            owned by them that is needed for their project.
          </li>
        </ul>
      </Section>

      <Section title="4. Fees and Payment">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Project fees are quoted before work begins and are based on the agreed
            scope of work.
          </li>
          <li>
            A deposit or milestone payments may be required before and during the
            project, as specified in the proposal.
          </li>
          <li>
            Invoices are payable according to the terms stated on the invoice.
            Late payments may delay project delivery.
          </li>
        </ul>
      </Section>

      <Section title="5. Intellectual Property">
        <p>
          Upon full payment for a project, ownership of the custom source code and
          final deliverables transfers to the client, unless otherwise agreed.
          Pigiecore Solutions retains ownership of any pre-existing tools, libraries,
          and general knowledge used to build your project.
        </p>
        <p>
          We may reference our work in our portfolio unless you request otherwise.
        </p>
      </Section>

      <Section title="6. Third-Party Services and Integrations">
        <p>
          Your project may rely on third-party platforms such as payment gateways
          (e.g., M-Pesa, Stripe), hosting providers, and messaging services. These
          services are governed by their own terms and are not controlled by us. We
          are not responsible for outages or changes to third-party services.
        </p>
      </Section>

      <Section title="7. Support and Maintenance">
        <p>
          We provide support during the warranty period agreed in your proposal.
          Ongoing support and maintenance plans are available and can be arranged
          separately. Support requests are handled through our designated channels
          and responded to within reasonable timeframes.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Pigiecore Solutions shall not be
          liable for any indirect, incidental, special, or consequential damages,
          including loss of profits, data, or goodwill, arising from the use of our
          services. Our total liability for any claim shall not exceed the total
          fees paid for the specific project giving rise to the claim.
        </p>
      </Section>

      <Section title="9. Termination">
        <p>
          Either party may terminate a project engagement with written notice.
          Upon termination, the client is responsible for payment for all work
          completed up to the date of termination. We may suspend or terminate access
          to our website if you violate these Terms.
        </p>
      </Section>

      <Section title="10. Governing Law">
        <p>
          These Terms are governed by the laws of the Republic of Kenya. Any
          disputes arising from these Terms shall be subject to the jurisdiction of
          the courts of Kenya.
        </p>
      </Section>

      <Section title="11. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of our website
          or services after changes are posted constitutes acceptance of the updated
          Terms.
        </p>
      </Section>
    </LegalPage>
  );
}