'use client';

import Link from 'next/link';

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-semibold border border-border rounded-lg hover:bg-muted transition-colors"
      >
        Log in
      </Link>

      <Link
        href="/signup"
        className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Sign up
      </Link>
    </div>
  );
}