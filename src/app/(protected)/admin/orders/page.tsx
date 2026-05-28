'use client';

import { useQuery } from '@tanstack/react-query';
import { CreditCard, IndianRupee, ReceiptText, RefreshCcw } from 'lucide-react';

import { api } from '@/api/axios';
import { withAuth } from '@/components/auth/withAuth';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSection from '@/components/dashboard/DashboardSection';
import { STAT_COLORS } from '@/config/dashboard-ui';
import { adminApi } from '@/api/admin.api';

interface AdminOrder {
  id: string;
  status: string;
  amountFormatted?: string;
  courseTitle?: string;
  course?: {
    title?: string;
  };
  student?: {
    name?: string;
  };
}

interface AdminOrdersData {
  orders: AdminOrder[];
  totalRevenue?: string;
}

function AdminOrdersPage() {
  const { data, isLoading } = useQuery<AdminOrdersData>({
    queryKey: ['admin-orders'],
    // queryFn: async () => {
    //   const res = await api.get('/payments/admin/orders');
    //   return res.data.data;
    // },
    queryFn: () => adminApi.getOrders(),

  });

  console.log('data in Orders', data);

  const orders = data?.orders || [];
  const completed = orders.filter((order) => order.status === 'COMPLETED').length;
  const pending = orders.filter((order) => order.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <div className="mb-8">
          <p className="section-label">ADMIN ORDERS</p>
          <h1 className="mt-2 text-4xl font-black text-foreground">
            Orders
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review Razorpay and free course order activity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Total Orders"
            value={isLoading ? '...' : orders.length}
            icon={ReceiptText}
            colorBg={STAT_COLORS.violet.bg}
            colorText={STAT_COLORS.violet.text}
          />
          <DashboardCard
            title="Revenue"
            value={isLoading ? '...' : data?.totalRevenue || 'INR 0.00'}
            icon={IndianRupee}
            colorBg={STAT_COLORS.emerald.bg}
            colorText={STAT_COLORS.emerald.text}
          />
          <DashboardCard
            title="Completed"
            value={isLoading ? '...' : completed}
            icon={CreditCard}
            colorBg={STAT_COLORS.cyan.bg}
            colorText={STAT_COLORS.cyan.text}
          />
          <DashboardCard
            title="Pending"
            value={isLoading ? '...' : pending}
            icon={RefreshCcw}
            colorBg={STAT_COLORS.orange.bg}
            colorText={STAT_COLORS.orange.text}
          />
        </div>

        <div className="mt-8">
          <DashboardSection title="Recent Orders">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No orders found yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-[1.2fr_1fr_120px_120px] gap-4 border-b border-border bg-muted px-4 py-3 text-xs font-bold uppercase text-muted-foreground">
                  <span>Course</span>
                  <span>Student</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-[1.2fr_1fr_120px_120px] gap-4 border-b border-border px-4 py-4 text-sm last:border-b-0"
                  >
                    <span className="truncate font-medium text-foreground">
                      {order.course?.title || order.courseTitle}
                    </span>
                    <span className="truncate text-muted-foreground">
                      {order.student?.name || 'Unknown'}
                    </span>
                    <span className="font-semibold text-foreground">
                      {order.amountFormatted || 'INR 0.00'}
                    </span>
                    <span className="text-muted-foreground">{order.status}</span>
                  </div>
                ))}
              </div>
            )}
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminOrdersPage, { allowedRoles: ['SUPERADMIN'] });
