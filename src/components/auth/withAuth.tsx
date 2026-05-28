'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/api/auth.api';

interface WithAuthOptions {
  allowedRoles?: User['role'][];
  redirectTo?: string;
}

// ─── Higher-order component for page-level protection ────────────────────────
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { allowedRoles, redirectTo = '/login' } = options;

  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (!isMounted) return;

      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }
      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to role's home
        if (user.role === 'SUPERADMIN') router.push('/admin/dashboard');
        else if (user.role === 'INSTRUCTOR') router.push('/instructor/dashboard');
        else router.push('/dashboard');
      }
    }, [isAuthenticated, user, router, isMounted]);

    if (!isMounted || !isAuthenticated) return null;
    if (allowedRoles && user && !allowedRoles.includes(user.role)) return null;

    return <Component {...props} />;
  };
}

// ─── Hook-based guard for use inside components ───────────────────────────────
export function useRequireAuth(allowedRoles?: User['role'][]) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      if (user.role === 'SUPERADMIN') router.push('/admin/dashboard');
      else if (user.role === 'INSTRUCTOR') router.push('/instructor/dashboard');
      else router.push('/dashboard');
    }
  }, [isAuthenticated, user]);

  return { user, isAuthenticated };
}
