'use client';

import { useEffect, useState } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { AccountState, getCurrentUser, onAccountChange, signIn, signUp, signOut } from '@/lib/supabase/auth';
import { pullAndMerge } from '@/lib/supabase/sync';

/**
 * Account control for the dashboard.
 *   * Local-only mode (no Supabase configured) -> renders nothing.
 *   * Signed out -> email + password form with a Sign in / Create account toggle.
 *   * Signed in -> email + a sign-out button.
 * On sign-in the cloud snapshot is union-merged into localStorage; if that
 * changed local data, the page reloads so the dashboard reflects it.
 */
export default function AccountMenu() {
  const [configured, setConfigured] = useState(false);
  const [account, setAccount] = useState<AccountState>({ user: null });
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setConfigured(true);

    let synced = false;
    const syncOnce = async () => {
      if (synced) return;
      synced = true;
      const changed = await pullAndMerge();
      if (changed && typeof window !== 'undefined') window.location.reload();
    };

    getCurrentUser().then((u) => {
      setAccount({ user: u });
      if (u) void syncOnce();
    });

    return onAccountChange((state) => {
      setAccount(state);
      if (state.user) void syncOnce();
    });
  }, []);

  if (!configured) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = mode === 'signup' ? await signUp(email, password) : await signIn(email, password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error || 'Something went wrong.');
      return;
    }
    setPassword('');
    // onAccountChange fires on success and handles pull + reload.
  };

  if (account.user) {
    return (
      <div className="mb-8 rounded-xl border border-slate-100 bg-white p-4 shadow-sm flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          Signed in as <span className="font-semibold text-slate-800">{account.user.email}</span>
          <span className="block text-xs text-slate-400">Your progress is backed up and synced across devices.</span>
        </p>
        <button onClick={() => signOut()} className="text-sm font-medium text-slate-500 hover:text-slate-800">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="text-sm text-slate-600">
          {mode === 'signin' ? 'Sign in to sync your progress across devices.' : 'Create an account to sync across devices.'}
          <span className="block text-xs text-slate-400">Your progress is saved on this device either way.</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError('');
          }}
          className="whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {mode === 'signin' ? 'Create account' : 'Have an account?'}
        </button>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-md border border-slate-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-40"
        />
        <button
          type="submit"
          disabled={busy}
          className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"
        >
          {busy ? 'Working...' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
