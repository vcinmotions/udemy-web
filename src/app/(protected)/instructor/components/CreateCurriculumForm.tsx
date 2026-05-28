// app/instructor/components/CreateCurriculumForm.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';

import {
  Plus,
  Trash2,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Loader2,
  Layers3,
} from 'lucide-react';

import {
  useFieldArray,
  useForm,
} from 'react-hook-form';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQuery } from '@tanstack/react-query';

import { instructorApi } from '@/api/instructor.api';
import { CldUploadWidget } from 'next-cloudinary';

// ─────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────

const lessonSchema = z.object({
  title: z.string().min(2),
  videoUrl: z.string().url(),
  duration: z.string().min(1),
  isPreview: z.boolean(),
});

const sectionSchema = z.object({
  title: z.string().min(2),
  lessons: z.array(lessonSchema).min(1),
});

const schema = z.object({
  sections: z.array(sectionSchema).min(1),
});

type FormData = z.infer<typeof schema>;



export function CreateCurriculumForm() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  // ── fetch course ────────────────────────────
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => instructorApi.getCourseById(courseId),
    enabled: !!courseId,
  });

  // If Next.js is processing the mock build asset path, render a shell placeholder
  if (courseId === 'id') {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }
  
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      sections: [
        {
          title: '',

          lessons: [
            {
              title: '',
              videoUrl: '',
              duration: '',
              isPreview: false,
            },
          ],
        },
      ],
    },
  });

  // ─────────────────────────────────────────────
  // SECTION ARRAY
  // ─────────────────────────────────────────────

  const sectionArray = useFieldArray({
    control,
    name: 'sections',
  });

  // ─────────────────────────────────────────────
  // CREATE CURRICULUM
  // ─────────────────────────────────────────────

  const curriculumMutation = useMutation({
    mutationFn: async (values: FormData) => {
        for (const section of values.sections) {

        // CREATE SECTION
        const createdSection =
            await instructorApi.createSection(
            courseId,
            {
                title: section.title,
            }
            );

        // CREATE LESSONS
        for (const lesson of section.lessons) {
            await instructorApi.createLesson(
            courseId,
            createdSection.id,
            {
                title: lesson.title,
                videoUrl: lesson.videoUrl,
                duration: lesson.duration,
                isPreview: lesson.isPreview,
                type: 'video',
            }
            );
        }
        }
    },

    onSuccess: () => {
        router.push('/instructor/courses');
    },
    });

  // ─────────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────────

    const onSubmit = (values: FormData) => {
        curriculumMutation.mutate(values);
    };

  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-400">
              <Layers3 size={14} />
              Curriculum Builder
            </div>

            <h1 className="text-4xl font-black tracking-tight">
              Create {course?.title} Curriculum
            </h1>

            <p className="mt-2 text-muted-foreground">
              Add sections and lessons for your course.
            </p>
          </div>

          <button
            type="submit"
            disabled={curriculumMutation.isPending}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-8 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {curriculumMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Save Curriculum
              </>
            )}
          </button>
        </div>

        {/* SECTIONS */}

        <div className="space-y-8">

          {sectionArray.fields.map(
            (section, sectionIndex) => {

              const lessonArray = useFieldArray({
                control,
                name: `sections.${sectionIndex}.lessons`,
              });

              return (
                <div
                  key={section.id}
                  className="rounded-3xl border bg-card p-7 shadow-sm"
                >

                  {/* SECTION HEADER */}

                  <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
                        <BookOpen size={22} />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold">
                          Section {sectionIndex + 1}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                          Course section details
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        sectionArray.remove(sectionIndex)
                      }
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border text-red-500 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* SECTION TITLE */}

                  <div className="mb-8">
                    <label className="mb-2 block text-sm font-semibold">
                      Section Title
                    </label>

                    <input
                      {...register(
                        `sections.${sectionIndex}.title`
                      )}
                      placeholder="Introduction"
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />

                    {errors.sections?.[sectionIndex]
                      ?.title && (
                      <p className="mt-2 text-sm text-red-500">
                        {
                          errors.sections?.[
                            sectionIndex
                          ]?.title?.message
                        }
                      </p>
                    )}
                  </div>

                  {/* LESSONS */}

                  <div className="space-y-6">

                    {lessonArray.fields.map(
                      (lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="rounded-2xl border p-5"
                        >

                          <div className="mb-5 flex items-center justify-between">

                            <div className="flex items-center gap-2">
                              <PlayCircle
                                size={18}
                              />

                              <h3 className="font-semibold">
                                Lesson{' '}
                                {lessonIndex + 1}
                              </h3>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                lessonArray.remove(
                                  lessonIndex
                                )
                              }
                              className="flex h-10 w-10 items-center justify-center rounded-xl border text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="grid gap-5">

                            {/* TITLE */}

                            <div>
                              <label className="mb-2 block text-sm font-semibold">
                                Lesson Title
                              </label>

                              <input
                                {...register(
                                  `sections.${sectionIndex}.lessons.${lessonIndex}.title`
                                )}
                                placeholder="Welcome to the course"
                                className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                              />
                            </div>

                            {/* VIDEO */}

                            <div>
                              <label className="mb-2 block text-sm font-semibold">
                                Video URL
                              </label>

                              <div className="space-y-3">

                                <input
                                  {...register(
                                    `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`
                                  )}
                                  placeholder="https://..."
                                  className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                                />

                                <CldUploadWidget
                                  uploadPreset="VcInmotions_"
                                  options={{
                                    sources: ['local'],
                                    multiple: false,
                                    resourceType: 'video',
                                    folder: 'course-lessons',
                                  }}
                                  onSuccess={(result: any) => {
                                    setValue(
                                      `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`,
                                      result.info.secure_url
                                    );
                                  }}
                                >
                                  {({ open }) => {
                                    return (
                                      <button
                                        type="button"
                                        onClick={() => open()}
                                        className="h-12 rounded-xl border px-4 text-sm font-medium hover:bg-muted"
                                      >
                                        Upload Lesson Video
                                      </button>
                                    );
                                  }}
                                </CldUploadWidget>

                                {watch(
                                  `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`
                                ) && (
                                  <video
                                    src={watch(
                                      `sections.${sectionIndex}.lessons.${lessonIndex}.videoUrl`
                                    )}
                                    controls
                                    className="w-full rounded-2xl"
                                  />
                                )}

                              </div>
                            </div>

                            {/* DURATION */}

                            <div>
                              <label className="mb-2 block text-sm font-semibold">
                                Duration
                              </label>

                              <input
                                {...register(
                                  `sections.${sectionIndex}.lessons.${lessonIndex}.duration`
                                )}
                                placeholder="12:45"
                                className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                              />
                            </div>

                            {/* PREVIEW */}

                            <label className="flex items-center gap-3 rounded-2xl border p-4">
                              <input
                                type="checkbox"
                                {...register(
                                  `sections.${sectionIndex}.lessons.${lessonIndex}.isPreview`
                                )}
                                className="h-5 w-5"
                              />

                              <span className="text-sm font-medium">
                                Free Preview Lesson
                              </span>
                            </label>
                          </div>
                        </div>
                      )
                    )}

                    {/* ADD LESSON */}

                    <button
                      type="button"
                      onClick={() =>
                        lessonArray.append({
                          title: '',
                          videoUrl: '',
                          duration: '',
                          isPreview: false,
                        })
                      }
                      className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-dashed text-sm font-semibold transition hover:bg-muted"
                    >
                      <Plus size={18} />
                      Add Lesson
                    </button>
                  </div>
                </div>
              );
            }
          )}

          {/* ADD SECTION */}

          <button
            type="button"
            onClick={() =>
              sectionArray.append({
                title: '',

                lessons: [
                  {
                    title: '',
                    videoUrl: '',
                    duration: '',
                    isPreview: false,
                  },
                ],
              })
            }
            className="flex h-16 w-full items-center justify-center gap-3 rounded-3xl border border-dashed text-base font-semibold transition hover:bg-muted"
          >
            <Plus size={20} />
            Add New Section
          </button>
        </div>
      </form>
    </div>
  );
}