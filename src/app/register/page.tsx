'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms of service');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, username);

      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        // Inscription réussie - afficher message de confirmation
        setSuccess(true);
        setIsLoading(false);
      }
    } catch {
      setError('Connection error. Please try again.');
      setIsLoading(false);
    }
  };

  // Afficher le message de succès
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 bg-[#0a0a0f]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#22c55e] rounded-full filter blur-[150px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#16a34a] rounded-full filter blur-[150px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f6a21a] to-[#ffd700] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-2xl">B</span>
            </div>
            <span className="text-2xl font-bold text-white">BrawlTokens</span>
          </Link>

          <div className="bg-[#12121a] border border-[#22c55e]/50 rounded-2xl p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-[#22c55e]/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">Check your email!</h1>

            <p className="text-gray-400 mb-6">
              We sent a confirmation link to<br />
              <span className="text-white font-semibold">{email}</span>
            </p>

            <div className="bg-[#f6a21a]/10 border border-[#f6a21a]/30 rounded-xl p-4 mb-6">
              <p className="text-[#f6a21a] text-sm">
                Click the link in the email to activate your account and receive your <strong>50 free tokens!</strong>
              </p>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Didn&apos;t receive the email? Check your spam folder.
            </p>

            <Link
              href="/login"
              className="inline-block btn-primary px-8 py-3 rounded-xl font-semibold"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0a0a0f]"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#f6a21a] rounded-full filter blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#ffd700] rounded-full filter blur-[150px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-[#f6a21a] to-[#ffd700] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-2xl">B</span>
          </div>
          <span className="text-2xl font-bold text-white">BrawlTokens</span>
        </Link>

        {/* Register Card */}
        <div className="bg-[#12121a] border border-[#2a2a3e] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Create an account</h1>
          <p className="text-gray-400 text-center mb-8">Join the community and start earning</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ShadowBlade"
                required
                minLength={3}
                maxLength={20}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a] transition-colors"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                className="w-full bg-[#0a0a0f] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f6a21a] transition-colors"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#2a2a3e] bg-[#0a0a0f] text-[#f6a21a] focus:ring-[#f6a21a]"
              />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I accept the{' '}
                <Link href="/terms" className="text-[#f6a21a] hover:underline">terms of service</Link>
                {' '}and the{' '}
                <Link href="/privacy" className="text-[#f6a21a] hover:underline">privacy policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 rounded-xl text-black font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create my account'
              )}
            </button>
          </form>

          {/* Bonus Info */}
          <div className="mt-6 bg-[#f6a21a]/10 border border-[#f6a21a]/30 rounded-xl p-4 text-center">
            <span className="text-[#f6a21a] font-semibold">Sign-up bonus: 50 free tokens!</span>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#f6a21a] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
