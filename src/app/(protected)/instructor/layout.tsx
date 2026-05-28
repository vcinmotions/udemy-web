import { DashboardLayout } from '@/components/layout/AsideBar';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}