'use client';

import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  AccountState,
  accountFromUser,
  getCurrentUser,
  onAccountChange,
  signOut,
  upgradeOrSignIn,
} from '@/lib/supabase/auth';

/**
 * Compact account control for the home page.
 *   * Local-only mode (no Supabase configured) → renders nothing.
 *   * Anonymous user → invites them to sign in to sync across devices.
 *   * Permanent user → shows their email and a sign-out button.
 */
export default function AccountMenu() {
  // Resolved after mount so server and first client render agree (both null).
  const [configured, setConfigured] = useState(false);
  const [account, setAccount] = useState<AccountState>({ user: null, isAnonymous: false });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setConfigured(true);
    getCurrentUser().then((u) => setAccount(accountFromUser(u)));
    return onAccountChange(setAccount);
  }, []);

  if (!configured) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const res = await upgradeOrSignIn(email);
    if (res.ok) {
      setStatus('sent');
      setMessage('Check your email for a sign-in link.');
    } else {
      setStatus('error');
      setMessage(res.error || 'Something went wrong.');
    }
  };

  const isPermanent = !!account.user && !account.isAnonymous;

  return (
    <div className="mb-8 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      {isPermanent ? (
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Signed in as <span className="font-semibold text-slate-800">{account.user?.email}</span>
            <span className="block text-xs text-slate-400">Your progress is backed up to your account.</span>
          </p>
          <button
            onClick={() => signOut()}
            className="text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Sign out
          </button>
        </div>
      ) : status === 'sent' ? (
        <p className="text-sm text-emerald-700">{message}</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="flex-1 text-sm text-slate-600">
            Progress is saved on this device.
            <span className="block text-xs text-slate-400">Sign in to back it up to your account.</span>
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"
            >
              {status === 'sending' ? 'Sending…' : 'Send link'}
            </button>
          </div>
        </form>
      )}
      {status === 'error' && <p className="mt-2 text-xs text-red-600">{message}</p>}
    </div>
  );
}
