import AccountSettingsPage from '@/components/dashboard/AccountSettingsPage';

export default function AdminSettingsPage() {
  return (
    <AccountSettingsPage
      allowedRoles={['SUPERADMIN']}
      eyebrow="ADMIN SETTINGS"
      title="Settings"
    />
  );
}
