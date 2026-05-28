'use client';
 
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
 
import {
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Video,
  BookOpen,
  Globe,
  Layers3,
  IndianRupee,
  FileText,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
 
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { instructorApi } from '@/api/instructor.api';
 
// ─────────────────────────────────────────────
// SCHEMA  (same as create)
// ─────────────────────────────────────────────
 
const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().min(10, 'Subtitle must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  image: z.string().url('Thumbnail must be valid URL'),
  previewVideo: z.string().url('Preview video must be valid URL'),
  price: z.number(),
  language: z.string(),
  level: z.string(),
  categoryId: z.string().min(1, 'Category is required'),
  subcategoryId: z.string().optional(),
  whatYouWillLearn: z.array(z.object({ value: z.string().min(1) })),
  requirements: z.array(z.object({ value: z.string().min(1) })),
});
 
type CourseFormData = z.infer<typeof schema>;
 
async function uploadToCloudinary(file: File) {
  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', 'YOUR_UPLOAD_PRESET');
  const res = await fetch(
    'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload',
    { method: 'POST', body: uploadData }
  );
  const data = await res.json();
  return data.secure_url;
}
 
// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
 
export default function EditCoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const router = useRouter();
 
  // ── fetch course ────────────────────────────
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => instructorApi.getCourseById(courseId),
    enabled: !!courseId,
  });

  console.log('course in edit page instructor', course);
 
  // ── fetch categories ────────────────────────
 
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: instructorApi.getCategories,
  });

  console.log('categories', categories);

 
  // ── form ────────────────────────────────────
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      image: '',
      previewVideo: '',
      price: 0,
      language: 'English',
      level: 'Beginner',
      categoryId: '',
      whatYouWillLearn: [{ value: '' }],
      requirements: [{ value: '' }],
    },
  });
 
  // Populate form when course data loads
  useEffect(() => {
    if (!course) return;
    reset({
      title: course.title ?? '',
      subtitle: course.subtitle ?? '',
      description: course.description ?? '',
      image: course.image ?? '',
      previewVideo: course.previewVideo ?? '',
      price: course.price ?? 0,
      language: course.language ?? 'English',
      level: course.level ?? 'Beginner',
      categoryId: course.categoryId ?? '',
      subcategoryId: course.subcategoryId ?? '',
      whatYouWillLearn:
        course.whatYouWillLearn?.map((v: string) => ({ value: v })) ?? [
          { value: '' },
        ],
      requirements:
        course.requirements?.map((v: string) => ({ value: v })) ?? [
          { value: '' },
        ],
    });
  }, [course, reset]);
 
  const selectedCategoryId = watch('categoryId');
  const thumbnail = watch('image');
 
  useEffect(() => {
    // Only clear subcategory when category changes, not on initial load
  }, [selectedCategoryId, setValue]);
 
  // ── field arrays ────────────────────────────
  const learnArray = useFieldArray({ control, name: 'whatYouWillLearn' });
  const requirementArray = useFieldArray({ control, name: 'requirements' });
 
  // ── file upload handlers ─────────────────────
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    setValue('image', url);
  };
 
  const handlePreviewUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadToCloudinary(file);
    setValue('previewVideo', url);
  };
 
  // ── mutation ────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: (data: any) => instructorApi.updateCourse(courseId, data),
    onSuccess: () => {
      router.push(`/instructor/courses/${courseId}`);
    },
  });
 
  const onSubmit = (values: CourseFormData) => {
    updateMutation.mutate({
      ...values,
      whatYouWillLearn: values.whatYouWillLearn.map((item) => item.value),
      requirements: values.requirements.map((item) => item.value),
    });
  };
 
  // ── loading ─────────────────────────────────
  if (courseLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      </div>
    );
  }
 
  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
 
  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* BACK */}
      <Link
        href={`/instructor/courses`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to Course
      </Link>
 
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1 text-sm font-medium text-violet-400">
              <Sparkles size={14} />
              Editing Course
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Edit Course
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Update the course details, media, and metadata.
            </p>
          </div>
 
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-8 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
 
        {/* GRID */}
        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* BASIC INFO */}
            <div className="rounded-3xl border bg-card p-7 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-500">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Basic Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Course title, subtitle and description
                  </p>
                </div>
              </div>
 
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Course Title
                  </label>
                  <input
                    placeholder="The Complete React & Next.js Bootcamp"
                    {...register('title')}
                    className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>
 
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Subtitle
                  </label>
                  <input
                    placeholder="Master React, Next.js, TypeScript..."
                    {...register('subtitle')}
                    className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                  />
                  {errors.subtitle && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.subtitle.message}
                    </p>
                  )}
                </div>
 
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Description
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Write a compelling course description..."
                    {...register('description')}
                    className="w-full rounded-2xl border bg-background p-5 outline-none transition focus:border-black"
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
 
            {/* MEDIA */}
            <div className="rounded-3xl border bg-card p-7 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-500">
                  <Video size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Media</h2>
                  <p className="text-sm text-muted-foreground">
                    Thumbnail and preview video
                  </p>
                </div>
              </div>
 
              <div className="grid gap-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Thumbnail URL
                  </label>
                  <div className="space-y-3">
                    <input
                      placeholder="https://..."
                      {...register('image')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="block w-full text-sm"
                    />
                  </div>
                </div>
 
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Preview Video URL
                  </label>
                  <div className="space-y-3">
                    <input
                      placeholder="https://..."
                      {...register('previewVideo')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handlePreviewUpload}
                      className="block w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
 
            {/* LEARNING OUTCOMES */}
            <div className="rounded-3xl border bg-card p-7 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    What Students Will Learn
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Add learning outcomes
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => learnArray.append({ value: '' })}
                  className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
 
              <div className="space-y-4">
                {learnArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`whatYouWillLearn.${index}.value`)}
                      placeholder={`Learning Outcome ${index + 1}`}
                      className="h-14 flex-1 rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => learnArray.remove(index)}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border text-red-500 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
 
            {/* REQUIREMENTS */}
            <div className="rounded-3xl border bg-card p-7 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Requirements</h2>
                  <p className="text-sm text-muted-foreground">
                    Add prerequisites
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => requirementArray.append({ value: '' })}
                  className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
 
              <div className="space-y-4">
                {requirementArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3">
                    <input
                      {...register(`requirements.${index}.value`)}
                      placeholder={`Requirement ${index + 1}`}
                      className="h-14 flex-1 rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={() => requirementArray.remove(index)}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl border text-red-500 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
              {/* THUMBNAIL PREVIEW */}
              <div className="relative aspect-video bg-muted">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Thumbnail Preview
                  </div>
                )}
              </div>
 
              <div className="space-y-5 p-6">
                <div>
                  <h3 className="text-lg font-bold">Course Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    This is how your course card may appear.
                  </p>
                </div>
 
                <div className="space-y-4">
                  {/* PRICE */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <IndianRupee size={16} />
                      Price
                    </label>
                    <input
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    />
                  </div>
 
                  {/* LANGUAGE */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Globe size={16} />
                      Language
                    </label>
                    <select
                      {...register('language')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
 
                  {/* LEVEL */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Layers3 size={16} />
                      Level
                    </label>
                    <select
                      {...register('level')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="AllLevels">All Levels</option>
                    </select>
                  </div>
 
                  {/* CATEGORY */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <FileText size={16} />
                      Category
                    </label>
                    <select
                      {...register('categoryId')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
 
                  {/* SUBCATEGORY */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Subcategory
                    </label>
                    <select
                      {...register('subcategoryId')}
                      className="h-14 w-full rounded-2xl border bg-background px-5 outline-none transition focus:border-black"
                    >
                      <option value="">Select Subcategory</option>
                      {categories
                        .find(
                          (category: any) =>
                            category.id === selectedCategoryId
                        )
                        ?.subcategories.map((subcategory: any) => (
                          <option
                            key={subcategory.id}
                            value={subcategory.id}
                          >
                            {subcategory.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}