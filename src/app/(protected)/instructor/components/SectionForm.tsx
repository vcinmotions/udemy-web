'use client';

import {
  Plus,
  Trash2,
  BookOpen,
  PlayCircle,
} from 'lucide-react';

import {
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from 'react-hook-form';

import type { FormData } from './CreateCurriculumForm';

import { CldUploadWidget } from 'next-cloudinary';

type Props = {
  section: any;
  sectionIndex: number;
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
  removeSection: (index: number) => void;
};

export default function SectionForm({
  section,
  sectionIndex,
  control,
  register,
  setValue,
  watch,
  errors,
  removeSection,
}: Props) {

  const lessonArray = useFieldArray({
    control,
    name: `sections.${sectionIndex}.lessons`,
  });

  return (
    <div className="rounded-3xl border bg-card p-7 shadow-sm">

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
          onClick={() => removeSection(sectionIndex)}
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
          {...register(`sections.${sectionIndex}.title`)}
          placeholder="Introduction"
          className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
        />

        {errors.sections?.[sectionIndex]?.title && (
          <p className="mt-2 text-sm text-red-500">
            {errors.sections?.[sectionIndex]?.title?.message as string}
          </p>
        )}
      </div>

      {/* LESSONS */}

      <div className="space-y-6">

        {lessonArray.fields.map((lesson, lessonIndex) => (
          <div
            key={lesson.id}
            className="rounded-2xl border p-5"
          >

            <div className="mb-5 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <PlayCircle size={18} />

                <h3 className="font-semibold">
                  Lesson {lessonIndex + 1}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  lessonArray.remove(lessonIndex)
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
        ))}

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