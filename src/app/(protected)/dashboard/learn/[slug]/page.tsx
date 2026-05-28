'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  ListVideo,
  PlayCircle,
} from 'lucide-react';

import { studentApi } from '@/api/student.api';
import { withAuth } from '@/components/auth/withAuth';

interface Lesson {
  id: string;
  title: string;
  duration?: string;
  type?: 'video' | 'article' | 'quiz';
  videoUrl?: string;
  content?: string;
  sectionTitle?: string;
}

interface Section {
  id: string;
  title: string;
  lessons?: Lesson[];
}

interface Course {
  id: string;
  title: string;
  sections?: Section[];
}

interface Enrollment {
  progress?: number;
  course?: Course;
}

function LearnPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const slug = params.slug as string;

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const { data: enrollment, isLoading } = useQuery<Enrollment>({
    queryKey: ['learning-course', slug],
    queryFn: () => studentApi.getLearningCourse(slug),
  });

  const course = enrollment?.course;
  const sections = useMemo(() => course?.sections || [], [course?.sections]);

  const lessons = useMemo(
    () =>
      sections.flatMap((section) =>
        (section.lessons || []).map((lesson) => ({
          ...lesson,
          sectionTitle: section.title,
        }))
      ),
    [sections]
  );

  const selectedLessonId = activeLessonId || lessons[0]?.id || null;

  const activeIndex = Math.max(
    0,
    lessons.findIndex((lesson) => lesson.id === selectedLessonId)
  );

  const activeLesson = lessons[activeIndex];
  const progress = Math.round(enrollment?.progress || 0);
  const completedLessonCount = Math.round((progress / 100) * lessons.length);

  const progressMutation = useMutation({
    mutationFn: (nextProgress: number) => {
      if (!course) {
        throw new Error('Course is not loaded');
      }

      return studentApi.updateProgress(course.id, nextProgress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learning-course', slug] });
      queryClient.invalidateQueries({ queryKey: ['my-courses'] });
    },
  });

  const goToLesson = (index: number) => {
    const lesson = lessons[index];
    if (lesson) setActiveLessonId(lesson.id);
  };

  const markCurrentLessonComplete = () => {
    if (!course || lessons.length === 0) return;

    const nextProgress = Math.max(
      progress,
      Math.round(((activeIndex + 1) / lessons.length) * 100)
    );

    progressMutation.mutate(nextProgress);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-10">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8">
        <button
          onClick={() => router.push('/dashboard/my-courses')}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft size={16} />
          Back to my courses
        </button>
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <h1 className="text-2xl font-black text-foreground">
            Course not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            This course is not available in your learning library.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[360px_1fr]">
        <aside className="border-r border-border bg-card">
          <div className="border-b border-border p-5">
            <button
              onClick={() => router.push('/dashboard/my-courses')}
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft size={16} />
              My Courses
            </button>

            <h1 className="line-clamp-2 text-xl font-black text-foreground">
              {course.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {lessons.length} lessons · {progress}% complete
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
            {sections.map((section, sectionIndex) => (
              <div key={section.id} className="border-b border-border">
                <div className="bg-muted/40 px-5 py-4">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Section {sectionIndex + 1}
                  </p>
                  <p className="mt-1 font-bold text-foreground">
                    {section.title}
                  </p>
                </div>

                {(section.lessons || []).map((lesson) => {
                  const lessonIndex = lessons.findIndex(
                    (item) => item.id === lesson.id
                  );
                  const isActive = activeLesson?.id === lesson.id;
                  const isComplete = lessonIndex < completedLessonCount;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`flex w-full items-start gap-3 border-t border-border px-5 py-4 text-left transition ${
                        isActive ? 'bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      {lesson.type === 'article' ? (
                        <FileText
                          size={18}
                          className={isActive ? 'text-primary' : 'text-muted-foreground'}
                        />
                      ) : (
                        <PlayCircle
                          size={18}
                          className={isActive ? 'text-primary' : 'text-muted-foreground'}
                        />
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-foreground">
                          {lesson.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {lesson.duration || 'Self paced'}
                        </p>
                      </div>

                      {isComplete && (
                        <CheckCircle2 size={17} className="text-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        <main className="flex min-w-0 flex-col">
          {activeLesson ? (
            <>
              <section className="bg-black">
                {activeLesson.videoUrl ? (
                  <video
                    controls
                    className="aspect-video w-full bg-black"
                    src={activeLesson.videoUrl}
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center">
                    <div className="text-center text-white">
                      <ListVideo className="mx-auto mb-4" size={48} />
                      <p className="text-lg font-bold">No video attached</p>
                      <p className="mt-1 text-sm text-white/70">
                        Continue with the lesson notes below.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              <section className="flex-1 p-6 lg:p-8">
                <div className="mx-auto max-w-5xl">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {activeLesson.sectionTitle}
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-foreground">
                        {activeLesson.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeLesson.duration || 'Self paced'} · Lesson{' '}
                        {activeIndex + 1} of {lessons.length}
                      </p>
                    </div>

                    <button
                      onClick={markCurrentLessonComplete}
                      disabled={progressMutation.isPending}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60"
                    >
                      <CheckCircle2 size={17} />
                      Mark Complete
                    </button>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                    <h3 className="text-lg font-bold text-foreground">
                      Lesson Notes
                    </h3>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {activeLesson.content ||
                        'Use this lesson workspace to watch the video, review the curriculum, and move through the course step by step.'}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      onClick={() => goToLesson(activeIndex - 1)}
                      disabled={activeIndex === 0}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ChevronLeft size={17} />
                      Previous
                    </button>

                    <button
                      onClick={() => goToLesson(activeIndex + 1)}
                      disabled={activeIndex >= lessons.length - 1}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                      <ChevronRight size={17} />
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center p-8">
              <div className="text-center">
                <PlayCircle className="mx-auto mb-5 text-muted-foreground" size={60} />
                <h2 className="text-3xl font-bold text-foreground">
                  No lessons yet
                </h2>
                <p className="mt-2 text-muted-foreground">
                  This course does not have a curriculum available.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default withAuth(LearnPage, { allowedRoles: ['STUDENT'] });
