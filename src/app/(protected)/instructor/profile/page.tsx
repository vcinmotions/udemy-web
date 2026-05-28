import AccountProfilePage from '@/components/dashboard/AccountProfilePage';

export default function InstructorProfilePage() {
  return (
    <AccountProfilePage
      allowedRoles={['INSTRUCTOR']}
      eyebrow="INSTRUCTOR PROFILE"
      title="Instructor Profile"
    />
  );
}
