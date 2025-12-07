'use client';

import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#8b5cf6] hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using BrawlTokens, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility</h2>
            <p>You must be at least 18 years old to use this platform. By using BrawlTokens, you confirm that you meet this age requirement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Responsibility</h2>
            <p>You are responsible for maintaining the security of your account and all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Fair Play</h2>
            <p>All matches must be played fairly. Cheating, exploiting bugs, or any form of match manipulation is strictly prohibited and will result in account termination.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Tokens and Payments</h2>
            <p>Tokens purchased are non-refundable. Winnings can be withdrawn according to our withdrawal policy. A 5% commission is taken from match winnings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
            <p>BrawlTokens is provided "as is" without warranties. We are not responsible for any losses incurred while using the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.</p>
          </section>

          <p className="text-gray-500 mt-8">Last updated: December 2024</p>
        </div>
      </div>
    </div>
  );
}
