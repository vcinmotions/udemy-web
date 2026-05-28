import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import type { LoginInput } from '@/lib/validators/auth.schema';

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),

    onSuccess: ({ user, accessToken, refreshToken }) => {
      setAuth(user, accessToken, refreshToken);
      queryClient.setQueryData(['me'], user);
      toast.success(`Welcome back, ${user.name}!`);

      // Role-based redirect
      switch (user.role) {
        case 'SUPERADMIN':
          router.push('/admin/dashboard');
          break;
        case 'INSTRUCTOR':
          router.push('/instructor/dashboard');
          break;
        case 'STUDENT':
        default:
          router.push('/dashboard');
          break;
      }
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    },
  });
}
