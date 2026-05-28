import AccountSettingsPage from '@/components/dashboard/AccountSettingsPage';

export default function StudentSettingsPage() {
  return (
    <AccountSettingsPage
      allowedRoles={['STUDENT']}
      eyebrow="STUDENT SETTINGS"
      title="Settings"
    />
  );
}
