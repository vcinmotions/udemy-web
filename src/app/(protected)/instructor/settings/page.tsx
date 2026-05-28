import AccountSettingsPage from '@/components/dashboard/AccountSettingsPage';

export default function InstructorSettingsPage() {
  return (
    <AccountSettingsPage
      allowedRoles={['INSTRUCTOR']}
      eyebrow="INSTRUCTOR SETTINGS"
      title="Settings"
    />
  );
}
