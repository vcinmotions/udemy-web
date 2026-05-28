'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import {
  Users,
  Mail,
  Shield,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  GraduationCap,
  Crown,
} from 'lucide-react';
import { api } from '@/api/axios';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'SUPERADMIN';
  createdAt: string;
};

type DashboardResponse = {
  recentUsers: User[];
  stats: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    pendingCourses: number;
  };
};

export default function AdminUsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get('/admin/dashboard');
      return res.data.data as DashboardResponse;
    },
  });

  const users = data?.recentUsers || [];

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'SUPERADMIN':
        return (
          <div className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            <Crown className="h-3 w-3" />
            Super Admin
          </div>
        );

      case 'INSTRUCTOR':
        return (
          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <GraduationCap className="h-3 w-3" />
            Instructor
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <UserCheck className="h-3 w-3" />
            Student
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage students, instructors, and admins
          </p>
        </div>

        <Link
          href="/admin/users/create"
          className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add User
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {data?.stats.totalUsers}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-4 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Students</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {
                  users.filter((u) => u.role === 'STUDENT')
                    .length
                }
              </h2>
            </div>

            <div className="rounded-2xl bg-green-100 p-4 text-green-600">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Instructors</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {
                  users.filter((u) => u.role === 'INSTRUCTOR')
                    .length
                }
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-100 p-4 text-orange-600">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Admins</p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {
                  users.filter((u) => u.role === 'SUPERADMIN')
                    .length
                }
              </h2>
            </div>

            <div className="rounded-2xl bg-purple-100 p-4 text-purple-600">
              <Shield className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        {/* TOP BAR */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search users..."
              className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  User
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {getRoleBadge(user.role)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />

                      {new Date(
                        user.createdAt,
                      ).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button className="rounded-xl p-2 transition hover:bg-gray-100">
                      <MoreHorizontal className="h-5 w-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className="mb-4 h-14 w-14 text-gray-300" />

              <h3 className="text-lg font-semibold text-gray-900">
                No users found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Users will appear here once registered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}