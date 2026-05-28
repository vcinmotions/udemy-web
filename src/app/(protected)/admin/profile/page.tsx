import AccountProfilePage from '@/components/dashboard/AccountProfilePage';

export default function AdminProfilePage() {
  return (
    <AccountProfilePage
      allowedRoles={['SUPERADMIN']}
      eyebrow="ADMIN PROFILE"
      title="Admin Profile"
    />
  );
}
