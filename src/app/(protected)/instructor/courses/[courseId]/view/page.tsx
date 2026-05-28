'use client';
 
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
 
import {
  ArrowLeft,
  Edit,
  Layers3,
  Globe,
  BookOpen,
  Video,
  FileText,
  Users,
  Star,
  Clock,
  IndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Play,
} from 'lucide-react';
 
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { instructorApi } from '@/api/instructor.api';
 
// ─────────────────────────────────────────────
// LECTURE TYPE ICON
// ─────────────────────────────────────────────
 
function LectureIcon({ type }: { type: string }) {
  if (type === 'video')
    return <Video size={14} className="shrink-0 text-cyan-500" />;
  if (type === 'quiz')
    return <BookOpen size={14} className="shrink-0 text-violet-500" />;
  return <FileText size={14} className="shrink-0 text-amber-500" />;
}
 
// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
 
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
      <div className={`rounded-2xl p-3 ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// SECTION ACCORDION
// ─────────────────────────────────────────────
 
function SectionAccordion({ section, index }: { section: any; index: number }) {
  const [open, setOpen] = useState(index === 0);
 
  const sectionDuration = section.lessons?.reduce(
    (acc: number, l: any) => acc + (l.duration || 0),
    0
  );
 
  return (
    <div className="overflow-hidden rounded-2xl border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 bg-card px-5 py-4 text-left transition hover:bg-muted/50"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="font-semibold">{section.title}</p>
          <p className="text-xs text-muted-foreground">
            {section.lessons?.length || 0} lessons
            {sectionDuration > 0 && ` · ${sectionDuration} mins`}
          </p>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
 
      {open && (
        <div className="divide-y bg-background">
          {section.lessons?.length === 0 && (
            <p className="px-5 py-4 text-sm text-muted-foreground">
              No lectures in this section
            </p>
          )}
          {section.lessons?.map((lecture: any, li: number) => (
            <div
              key={lecture.id ?? li}
              className="flex items-center gap-3 px-5 py-3"
            >
              <LectureIcon type={lecture.type} />
              <span className="flex-1 text-sm">{lecture.title}</span>
              {lecture.isPreview && (
                <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                  <Eye size={11} />
                  Free
                </span>
              )}
              {lecture.duration > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={11} />
                  {lecture.duration}m
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
 
export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const queryClient = useQueryClient();
 
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => instructorApi.getCourseById(courseId),
    enabled: !!courseId,
  });

  console.log('course', course);
 
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }
 
  if (!course) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-3 text-muted-foreground">
        <p className="text-lg font-semibold">Course not found</p>
        <Link href="/instructor/courses" className="text-sm underline">
          Back to courses
        </Link>
      </div>
    );
  }
 
  const totalLectures = course.sections?.reduce(
    (acc: number, s: any) => acc + (s.lectures?.length || 0),
    0
  ) ?? 0;
 
  const totalDuration = course.sections?.reduce(
    (acc: number, s: any) =>
      acc +
      (s.lectures?.reduce((a: number, l: any) => a + (l.duration || 0), 0) ||
        0),
    0
  ) ?? 0;
 
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      {/* BACK */}
      <Link
        href="/instructor/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Courses
      </Link>
 
      {/* HERO */}
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="relative h-64 w-full bg-muted sm:h-80">
          {course.image ? (
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Thumbnail
            </div>
          )}
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {course.level}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {course.language}
              </span>
              {course.category?.name && (
                <span className="rounded-full bg-violet-500/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {course.category.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-white sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-white/70">
              {course.subtitle}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {course.isDraft && (
                <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
                  Draft
                </span>
              )}

              {course.isPublished && !course.isApproved && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Under Review
                </span>
              )}

              {course.isApproved && (
                <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                  Approved
                </span>
              )}
            </div>
          </div>
        </div>
 
        {/* ACTIONS */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-2xl font-black">
              <IndianRupee size={18} />
              {course.price}
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/instructor/courses/${courseId}/curriculum`}
              className="flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted"
            >
              <Layers3 size={16} />
              Edit Curriculum
            </Link>
            <Link
              href={`/instructor/courses/${courseId}/edit`}
              className="flex items-center gap-2 rounded-2xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Edit size={16} />
              Edit Course
            </Link>

            <button
              onClick={async () => {
                try {
                  await instructorApi.togglePublish(course.id);

                  await queryClient.invalidateQueries({
                    queryKey: ['course', courseId],
                  });
                } catch (err: any) {
                  alert(
                    err?.response?.data?.message ||
                    'Failed to publish course'
                  );
                }
              }}
              disabled={course.isPublished}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
                course.isPublished
                  ? 'bg-green-600 text-white'
                  : 'bg-violet-600 text-white hover:opacity-90'
              }`}
            >
              {course.isPublished ? (
                <>
                  <CheckCircle2 size={16} />
                  Submitted
                </>
              ) : (
                <>
                  <Play size={16} />
                  Publish Course
                </>
              )}
            </button>
          </div>
        </div>
      </div>
 
      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={20} />}
          label="Students Enrolled"
          value={course.enrollments ?? 0}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          icon={<Star size={20} />}
          label="Average Rating"
          value={course.rating ?? '—'}
          color="bg-amber-500/10 text-amber-500"
        />
        <StatCard
          icon={<BookOpen size={20} />}
          label="Total Lectures"
          value={totalLectures}
          color="bg-violet-500/10 text-violet-500"
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Total Duration"
          value={`${totalDuration}m`}
          color="bg-green-500/10 text-green-500"
        />
      </div>
 
      {/* MAIN CONTENT */}
      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* LEFT */}
        <div className="space-y-8">
          {/* CURRICULUM */}
          <div className="rounded-3xl border bg-card p-7 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
                  <Layers3 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Curriculum</h2>
                  <p className="text-sm text-muted-foreground">
                    {course.sections?.length ?? 0} sections · {totalLectures}{' '}
                    lectures
                  </p>
                </div>
              </div>
              <Link
                href={`/instructor/courses/${courseId}/curriculum`}
                className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
              >
                <Edit size={14} />
                Edit
              </Link>
            </div>
 
            <div className="space-y-3">
              {!course.curriculum?.length ? (
                <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm text-muted-foreground">
                  <Layers3 size={20} />
                  No curriculum yet.{' '}
                  <Link
                    href={`/instructor/courses/${courseId}/curriculum`}
                    className="text-violet-500 underline"
                  >
                    Add sections
                  </Link>
                </div>
              ) : (
                course.curriculum.map((section: any, i: number) => (
                  <SectionAccordion key={section.id ?? i} section={section} index={i} />
                ))
              )}
            </div>
          </div>
 
          {/* DESCRIPTION */}
          <div className="rounded-3xl border bg-card p-7 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Description</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {course.description || 'No description provided.'}
            </p>
          </div>
        </div>
 
        {/* RIGHT */}
        <div className="space-y-6">
          {/* WHAT YOU'LL LEARN */}
          {course.whatYouWillLearn?.length > 0 && (
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold">What Students Will Learn</h3>
              <ul className="space-y-2.5">
                {course.whatYouWillLearn.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-green-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
 
          {/* REQUIREMENTS */}
          {course.requirements?.length > 0 && (
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold">Requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {course.requirements.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
 
          {/* META */}
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-bold">Course Details</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: <Globe size={14} />, label: 'Language', val: course.language },
                { icon: <Layers3 size={14} />, label: 'Level', val: course.level },
                {
                  icon: <BookOpen size={14} />,
                  label: 'Category',
                  val: course.category?.name ?? '—',
                },
                {
                  icon: <FileText size={14} />,
                  label: 'Subcategory',
                  val: course.subcategory?.name ?? '—',
                },
              ].map(({ icon, label, val }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    {icon}
                    {label}
                  </span>
                  <span className="font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}