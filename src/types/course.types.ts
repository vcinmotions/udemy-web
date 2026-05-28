export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  bio: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string; // ADD THIS
  isPreview: boolean;
  type: 'video' | 'quiz' | 'resource';
}

export interface CurriculumSection {
  id: string;
  title: string;
  lessons: Lesson[];
  totalDuration: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  previewVideo: string;

  rating: number;
  reviewCount: number;
  studentCount: number;

  instructor: Instructor;

  category: {
    id: string;
    name: string;
    slug: string;
  };

  subcategory: {
    id: string;
    name: string;
    slug: string;
  };

  language: string;

  level:
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
    | 'All Levels';

  lastUpdated: string;

  price: number;
  originalPrice: number;

  totalHours: number;
  totalLectures: number;
  totalArticles: number;

  hasCertificate: boolean;
  hasLifetimeAccess: boolean;
  hasMobileAccess: boolean;

  badge:
    | 'Bestseller'
    | 'New'
    | 'Hot'
    | 'Popular'
    | 'Premium'
    | 'Advanced'
    | 'Free'
    | 'Recommended'
    | null;

  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  reviews: Review[];
  tags: string[];
}