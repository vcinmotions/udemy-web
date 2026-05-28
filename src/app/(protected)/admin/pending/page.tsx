// app/admin/pending/page.tsx
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/axios';
import {
  Check, X, Clock, BookOpen, Search,
  GraduationCap, Globe, IndianRupee, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { adminApi } from '@/api/admin.api';

type PendingCourse = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  price: number;
  level: string;
  language: string;
  isPublished: boolean;
  isApproved: boolean;
  createdAt: string;
  instructor: { id: string; name: string; avatar?: string; headline?: string };
  category: { name: string };
  subcategory?: { name: string };
  _count?: { enrollments: number };
};

// ── Sub-components ───────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-3xl font-black ${color}`}>{value}</p>
    </div>
  );
}

function CourseRow({
  course,
  onApprove,
  onReject,
  loading,
}: {
  course: PendingCourse;
  onApprove: () => void;
  onReject: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-card p-5 transition hover:shadow-sm sm:flex-row sm:items-center">
      {/* Thumbnail */}
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
        {course.image ? (
          <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen size={24} className="text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/admin/courses/${course.id}`}
          className="line-clamp-1 font-bold hover:underline"
        >
          {course.title}
        </Link>
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{course.subtitle}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* Instructor */}
          <span className="flex items-center gap-1 rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-700">
            <GraduationCap size={11} />
            {course.instructor.name}
          </span>

          {/* Category */}
          {/* <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            {course.category.name}
          </span> */}

          {/* Level */}
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            {course.level}
          </span>

          {/* Language */}
          <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            <Globe size={10} />
            {course.language}
          </span>

          {/* Price */}
          <span className="flex items-center gap-0.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-700">
            {course.price === 0 ? (
              'Free'
            ) : (
              <>
                <IndianRupee size={10} />
                {course.price}
              </>
            )}
          </span>

          {/* Submitted */}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={10} />
            {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/courses/${course.id}`}
          className="flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-medium transition hover:bg-muted"
        >
          Review <ChevronRight size={13} />
        </Link>

        <button
          onClick={onReject}
          disabled={loading}
          className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
        >
          <X size={13} />
          Reject
        </button>

        <button
          onClick={onApprove}
          disabled={loading}
          className="flex items-center gap-1 rounded-xl bg-black px-3 py-2 text-xs font-semibold text-white transition hover:opacity-80 disabled:opacity-50"
        >
          <Check size={13} />
          Approve
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function PendingCoursesPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [actionId, setActionId] = useState<string | null>(null);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['admin-pending-courses'],
    queryFn: () => adminApi.getPendingCourses(),
  });

  console.log('courses', courses);

  const approveMutation = useMutation({
    mutationFn: adminApi.approveCourse,
    onMutate: (id) => setActionId(id),
    onSettled: () => { setActionId(null); qc.invalidateQueries({ queryKey: ['admin-pending-courses'] }); },
  });

  const rejectMutation = useMutation({
    mutationFn: adminApi.rejectCourse,
    onMutate: (id) => setActionId(id),
    onSettled: () => { setActionId(null); qc.invalidateQueries({ queryKey: ['admin-pending-courses'] }); },
  });

  const filtered = courses.filter((c: any) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.instructor.name.toLowerCase().includes(q) ||
      c.category.name.toLowerCase().includes(q);
    const matchLevel = !levelFilter || c.level === levelFilter;
    return matchSearch && matchLevel;
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black">Pending Approvals</h1>
        <p className="text-sm text-muted-foreground">
          Review and approve instructor course submissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Awaiting review" value={courses.length} color="text-amber-500" />
        <StatCard label="Beginner" value={courses.filter((c: { level: string; }) => c.level === 'Beginner').length} color="text-foreground" />
        <StatCard label="Free courses" value={courses.filter((c: { price: number; }) => c.price === 0).length} color="text-blue-500" />
        <StatCard label="This week" value={courses.filter((c: { createdAt: string | number | Date; }) => {
          const d = new Date(c.createdAt);
          const now = new Date();
          return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
        }).length} color="text-violet-500" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, instructor, category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="h-10 rounded-xl border bg-background px-3 text-sm outline-none"
        >
          <option value="">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="AllLevels">All levels</option>
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-3xl border border-dashed text-muted-foreground">
          <Check size={28} className="text-green-500" />
          <p className="font-semibold">All caught up!</p>
          <p className="text-sm">No pending courses to review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((course: { id: any; title?: string; subtitle?: string | undefined; image?: string | undefined; price?: number; level?: string; language?: string; isPublished?: boolean; isApproved?: boolean; createdAt?: string; instructor?: { id: string; name: string; avatar?: string; headline?: string; }; category?: { name: string; }; subcategory?: { name: string; } | undefined; _count?: { enrollments: number; } | undefined; }) => (
            <CourseRow
              key={course.id}
              course={course as PendingCourse}
              loading={actionId === course.id}
              onApprove={() => approveMutation.mutate(course.id)}
              onReject={() => rejectMutation.mutate(course.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}