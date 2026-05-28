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

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQuery } from '@tanstack/react-query';

import { instructorApi } from '@/api/instructor.api';
import { CldUploadWidget } from 'next-cloudinary';
import SectionForm from './SectionForm';


export type FormData = z.infer<typeof schema>;

// ─────────────────────────────────────────────
// SCHEMA
// ─────────────────────────────────────────────

const lessonSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  videoUrl: z.string().url(),
  duration: z.string().min(1),
  isPreview: z.boolean(),
});

const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  lessons: z.array(lessonSchema).min(1),
});

const schema = z.object({
  sections: z.array(sectionSchema).min(1),
});

// type FormData = z.infer<typeof schema>;

export function CreateCurriculumForm() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();

  // ── fetch course ────────────────────────────
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => instructorApi.getCourseById(courseId),
    enabled: !!courseId,
  });
  
  console.log('course in curriculum page instructor', course);

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
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    // defaultValues: {
    //   sections: [
    //     {
    //       title: '',

    //       lessons: [
    //         {
    //           title: '',
    //           videoUrl: '',
    //           duration: '',
    //           isPreview: false,
    //         },
    //       ],
    //     },
    //   ],
    // },

    defaultValues: {
      sections: [],
    },
  });

  useEffect(() => {
    if (!course) return;

    if (course.curriculum?.length > 0) {
      reset({
        sections: course.curriculum.map((section: any) => ({
          id: section.id,
          title: section.title,

          lessons: section.lessons.map((lesson: any) => ({
            id: lesson.id,
            title: lesson.title,
            videoUrl: lesson.videoUrl || '',
            duration: lesson.duration || '',
            isPreview: lesson.isPreview || false,
          })),
        })),
      });
    } else {
      reset({
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
      });
    }
  }, [course, reset]);

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
    // mutationFn: async (values: FormData) => {
    //     for (const section of values.sections) {

    //     // CREATE SECTION
    //     const createdSection =
    //         await instructorApi.createSection(
    //         courseId,
    //         {
    //             title: section.title,
    //         }
    //         );

    //     // CREATE LESSONS
    //     for (const lesson of section.lessons) {
    //         await instructorApi.createLesson(
    //         courseId,
    //         createdSection.id,
    //         {
    //             title: lesson.title,
    //             videoUrl: lesson.videoUrl,
    //             duration: lesson.duration,
    //             isPreview: lesson.isPreview,
    //             type: 'video',
    //         }
    //         );
    //     }
    //     }
    // },


    mutationFn: async (values: FormData) => {
      for (const section of values.sections) {

        let sectionId = section.id;

        // UPDATE EXISTING SECTION
        if (section.id) {
          await instructorApi.updateSection(
            courseId,
            section.id,
            {
              title: section.title,
            }
          );
        }

        // CREATE NEW SECTION
        else {
          const createdSection =
            await instructorApi.createSection(
              courseId,
              {
                title: section.title,
              }
            );

          sectionId = createdSection.id;
        }

        // LESSONS
        for (const lesson of section.lessons) {

          // UPDATE EXISTING LESSON
          if (lesson.id) {
            await instructorApi.updateLesson(
              courseId,
              sectionId!,
              lesson.id,
              {
                title: lesson.title,
                videoUrl: lesson.videoUrl,
                duration: lesson.duration,
                isPreview: lesson.isPreview,
                type: 'video',
              }
            );
          }

          // CREATE NEW LESSON
          else {
            await instructorApi.createLesson(
              courseId,
              sectionId!,
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
    <div className="mx-auto max-w-7xl lg:p-8">

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

          {sectionArray.fields.map((section, sectionIndex) => (
            <SectionForm
              key={section.id}
              section={section}
              sectionIndex={sectionIndex}
              control={control}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              removeSection={sectionArray.remove}
            />
          ))}

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