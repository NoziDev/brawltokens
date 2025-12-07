'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
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

    const { error } = await signUp(email, password, username);

    if (error) {
      setError(error);
      setIsLoading(false);
    } else {
      router.push('/');
    }
  };

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
