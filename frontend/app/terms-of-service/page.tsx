import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="flex min-h-screen bg-black px-4 py-10 font-sans text-zinc-50">
      <div className="w-full space-y-6">
      <Link
        href="/signin"
        className="inline-flex items-center text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Back
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight text-left">Terms of Service</h1>

        <div className="w-full rounded-xl bg-[#171717] p-6 shadow-sm">
          <div className="space-y-6 text-sm text-zinc-200">
            <p className="text-sm text-muted-foreground">
              Last updated: November 19, 2025
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By accessing or using the Conduit platform (&quot;Service&quot;), you
                agree to be bound by these Terms of Service (&quot;Terms&quot;). If you
                are using the Service on behalf of an organization, you
                represent that you have authority to bind that organization to
                these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Conduit is a multi-tenant AI call center platform that enables
                businesses to create workspaces with AI agents, phone numbers,
                and knowledge bases to assist their customers. Features may
                evolve over time and we may add, modify, or remove features at
                our discretion.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. Accounts and Workspaces</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You must provide accurate information when creating an account
                or workspace and keep it up to date. You are responsible for
                maintaining the confidentiality of your login credentials and
                for all activity that occurs under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. Customer Data & Call Content</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You retain all rights to the data, call recordings, and
                transcripts that are generated through your use of the Service
                (&quot;Customer Data&quot;). You grant Conduit a limited, worldwide,
                royalty-free license to host, process, transmit, and analyze
                Customer Data only as necessary to provide and improve the
                Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You agree not to use the Service to violate any applicable laws
                or regulations, infringe on the rights of others, or engage in
                abusive, fraudulent, or deceptive practices. You are
                responsible for ensuring that your use of telephony and AI
                capabilities complies with all applicable telecommunications,
                privacy, and data protection laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. Third-Party Services</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The Service integrates with third-party providers such as
                Twilio, LiveKit, Supabase, and AI model providers. Your use of
                these services may be subject to their own terms and privacy
                policies. Conduit is not responsible for the acts or omissions
                of third-party providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7. Confidentiality & Security</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We implement reasonable technical and organizational measures to
                protect Customer Data. However, no system is completely secure,
                and you acknowledge that you share responsibility for securing
                your accounts, API keys, and integrations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">8. Fees and Payment</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you subscribe to a paid plan, you agree to pay all fees in
                accordance with the pricing and billing terms presented to you.
                We may modify pricing with prior notice in accordance with your
                agreement or applicable law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9. Term, Suspension, and Termination</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We may suspend or terminate your access to the Service if you
                violate these Terms or if we reasonably believe your use causes
                a security risk or legal liability. Upon termination, your
                right to use the Service will immediately cease, but certain
                provisions of these Terms will continue to apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">10. Disclaimers</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS
                WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR
                STATUTORY, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">11. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CONDUIT AND ITS
                AFFILIATES WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
                PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY,
                OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">12. Changes to These Terms</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We may update these Terms from time to time. If we make
                material changes, we will provide notice through the Service or
                via email. Your continued use of the Service after the changes
                become effective constitutes your acceptance of the updated
                Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">13. Contact Us</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you have questions about these Terms, you can contact us at
                support@conduit.ai or through your account representative.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
