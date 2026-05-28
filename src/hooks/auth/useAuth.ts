import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';

// ─── Logout ───────────────────────────────────────────────────────────────────
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearAuth, refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => authApi.logout(refreshToken || ''),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully.');
      router.push('/');
    },
  });
}

// ─── Get current user ─────────────────────────────────────────────────────────
export function useMe() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });
}
