// app/auth/layout.tsx

import '../../styles/index.css';

import QueryProvider from '@/providers/QueryProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {/* <Navbar /> */}

      {children}

      {/* <Footer /> */}
    </QueryProvider>
  );
}