import AccountProfilePage from '@/components/dashboard/AccountProfilePage';

export default function StudentProfilePage() {
  return (
    <AccountProfilePage
      allowedRoles={['STUDENT']}
      eyebrow="STUDENT PROFILE"
      title="My Profile"
    />
  );
}
