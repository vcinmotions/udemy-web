import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/api/auth.api';
import { useAuthStore } from '@/store/auth.store';
import type { StudentSignupInput, InstructorSignupInput } from '@/lib/validators/auth.schema';

// ─── Student Signup ───────────────────────────────────────────────────────────
export function useStudentSignup() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: StudentSignupInput) => authApi.registerStudent(data),

    onSuccess: ({ user, accessToken, refreshToken }) => {
      setAuth(user, accessToken, refreshToken);
      toast.success('Account created! Welcome aboard 🎉');
      router.push('/dashboard');
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message);
    },
  });
}

// ─── Instructor Signup ────────────────────────────────────────────────────────
export function useInstructorSignup() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: InstructorSignupInput) => authApi.registerInstructor(data),

    onSuccess: ({ user, accessToken, refreshToken }) => {
      setAuth(user, accessToken, refreshToken);
      toast.success('Instructor account created! Start building your course 🚀');
      router.push('/instructor/dashboard');
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message);
    },
  });
}
