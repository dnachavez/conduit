import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen bg-black px-4 py-10 font-sans text-zinc-50">
      <div className="w-full space-y-6">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-zinc-400 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight text-left">Privacy Policy</h1>

        <div className="w-full rounded-xl bg-[#171717] p-6 shadow-sm">
          <div className="space-y-6 text-sm text-zinc-200">
            <p className="text-sm text-muted-foreground">
              Last updated: November 19, 2025
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. Overview</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This Privacy Policy explains how Conduit (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) collects, uses, and protects information when you use
                our AI call center platform (&quot;Service&quot;). By using the Service,
                you consent to the practices described in this Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. Information We Collect</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We collect information that you provide directly to us, such as
                account registration details, workspace settings, and support
                communications. We also process call metadata, audio
                recordings, transcripts, and interaction logs generated through
                your use of the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. How We Use Information</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We use the information we collect to provide, operate, and
                maintain the Service, including routing calls, generating AI
                responses, storing transcripts, and enabling human handoffs. We
                may also use aggregated or anonymized data to improve models,
                reliability, and user experience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. Legal Bases for Processing</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Where required by applicable law, we process personal data on
                the basis of your consent, our legitimate interests in
                providing and improving the Service, and our obligations under
                applicable contracts and regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. Data Sharing and Transfers</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We may share information with third-party service providers who
                assist us in operating the Service, such as telephony
                providers, infrastructure hosts, and AI model providers. These
                providers are authorized to use personal data only as necessary
                to provide services to us and are subject to appropriate
                confidentiality and security obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. International Data Transfers</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your information may be processed in countries other than the
                country where you reside. When we transfer personal data
                internationally, we implement appropriate safeguards such as
                standard contractual clauses or other lawful transfer
                mechanisms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7. Data Retention</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We retain personal data for as long as necessary to provide the
                Service, comply with legal obligations, resolve disputes, and
                enforce our agreements. Workspace administrators may have
                controls to manage retention of call recordings and
                transcripts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">8. Your Rights</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Depending on your jurisdiction, you may have rights regarding
                your personal data, such as the right to access, correct, or
                delete information we hold about you, or to object to or
                restrict certain processing. You can exercise these rights by
                contacting us using the information below, or by working with
                your workspace administrator.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9. Security</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We use reasonable technical and organizational measures to help
                protect personal data against loss, misuse, and unauthorized
                access. However, no system is completely secure, and we cannot
                guarantee absolute security of your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">10. Children&apos;s Privacy</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The Service is not directed to children under the age of 16 and
                we do not knowingly collect personal data from children. If we
                become aware that a child has provided us with personal data,
                we will take steps to delete such information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">11. Changes to This Policy</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We may update this Privacy Policy from time to time. If we make
                material changes, we will provide notice through the Service or
                by other reasonable means. Your continued use of the Service
                after the changes become effective constitutes your acceptance
                of the updated Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">12. Contact Us</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at privacy@conduit.ai or through
                your account representative.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
