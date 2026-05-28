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
  title: string;
  subtitle: string;
  description: string;
  image: string;
  previewVideo: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  instructor: Instructor;
  category: string;
  subcategory: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  lastUpdated: string;
  price: number;
  originalPrice: number;
  totalHours: number;
  totalLectures: number;
  totalArticles: number;
  hasCertificate: boolean;
  hasLifetimeAccess: boolean;
  hasMobileAccess: boolean;
  badge: 'Bestseller' | 'New' | 'Hot' | 'Popular' | 'Premium' | 'Advanced' | 'Free' | 'Recommended' | null;
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  reviews: Review[];
  tags: string[];
}

// export interface Course {
//   id: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   image: string;
//   previewVideo: string;

//   rating: number;
//   reviewCount: number;
//   studentCount: number;

//   instructor: Instructor;

//   category: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   subcategory: {
//     id: string;
//     name: string;
//     slug: string;
//   };

//   language: string;

//   level:
//     | 'Beginner'
//     | 'Intermediate'
//     | 'Advanced'
//     | 'All Levels';

//   lastUpdated: string;

//   price: number;
//   originalPrice: number;

//   totalHours: number;
//   totalLectures: number;
//   totalArticles: number;

//   hasCertificate: boolean;
//   hasLifetimeAccess: boolean;
//   hasMobileAccess: boolean;

//   badge:
//     | 'Bestseller'
//     | 'New'
//     | 'Hot'
//     | 'Popular'
//     | 'Premium'
//     | 'Advanced'
//     | 'Free'
//     | 'Recommended'
//     | null;

//   whatYouWillLearn: string[];
//   requirements: string[];
//   curriculum: CurriculumSection[];
//   reviews: Review[];
//   tags: string[];
// }

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export const instructors: Instructor[] = [
{
  id: 'inst-001',
  name: 'Angela Morrison',
  title: 'Senior Full-Stack Engineer & Educator',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Angela&backgroundColor=b6e3f4',
  rating: 4.8,
  reviews: 142380,
  students: 892450,
  courses: 12,
  bio: "Angela has 14 years of industry experience at Google and Stripe. She's taught over 890K students how to build production-grade web applications. Her courses are known for clear explanations, real-world projects, and zero fluff."
},
{
  id: 'inst-002',
  name: 'Marcus Chen',
  title: 'Machine Learning Engineer at Meta',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Marcus&backgroundColor=c0aede',
  rating: 4.9,
  reviews: 98200,
  students: 524100,
  courses: 7,
  bio: 'Marcus is an ML engineer with publications in NeurIPS and ICML. He simplifies complex deep learning concepts into hands-on projects that students can deploy to production.'
},
{
  id: 'inst-003',
  name: 'Priya Nair',
  title: 'UX Design Lead & Product Strategist',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Priya&backgroundColor=ffdfbf',
  rating: 4.7,
  reviews: 67500,
  students: 310200,
  courses: 9,
  bio: 'Priya led design teams at Figma and Airbnb. Her courses bridge the gap between theory and practice, covering UX research, Figma mastery, and design systems.'
},
{
  id: 'inst-004',
  name: 'David Okafor',
  title: 'Cloud Architect & DevOps Consultant',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=David&backgroundColor=d1f4d1',
  rating: 4.8,
  reviews: 54100,
  students: 268900,
  courses: 6,
  bio: 'David holds AWS, GCP, and Azure certifications. He has architected infrastructure for Fortune 500 companies and teaches cloud engineering the way it is actually practiced at scale.'
}];


const curriculumReact: CurriculumSection[] = [
{
  id: 'sec-001',
  title: 'Getting Started with React 19',
  totalDuration: '1h 24m',
  lessons: [
  { id: 'les-001', title: 'Course Introduction & What We Will Build', duration: '5:42', isPreview: true, type: 'video' },
  { id: 'les-002', title: 'Setting Up Your Development Environment', duration: '12:18', isPreview: true, type: 'video' },
  { id: 'les-003', title: 'Understanding JSX and the Virtual DOM', duration: '18:05', isPreview: false, type: 'video' },
  { id: 'les-004', title: 'Your First React Component', duration: '14:30', isPreview: false, type: 'video' },
  { id: 'les-005', title: 'Props, State, and Re-renders', duration: '22:10', isPreview: false, type: 'video' },
  { id: 'les-006', title: 'Section Quiz: React Fundamentals', duration: '10 questions', isPreview: false, type: 'quiz' }]

},
{
  id: 'sec-002',
  title: 'Hooks Deep Dive',
  totalDuration: '2h 48m',
  lessons: [
  { id: 'les-007', title: 'useState and useReducer in Depth', duration: '28:45', isPreview: false, type: 'video' },
  { id: 'les-008', title: 'useEffect: Side Effects and Cleanup', duration: '31:20', isPreview: true, type: 'video' },
  { id: 'les-009', title: 'useContext and the Context API', duration: '24:15', isPreview: false, type: 'video' },
  { id: 'les-010', title: 'useMemo and useCallback — Performance', duration: '26:00', isPreview: false, type: 'video' },
  { id: 'les-011', title: 'Custom Hooks — Building Reusable Logic', duration: '35:40', isPreview: false, type: 'video' },
  { id: 'les-012', title: 'React 19: useTransition and useDeferredValue', duration: '22:10', isPreview: false, type: 'video' }]

},
{
  id: 'sec-003',
  title: 'State Management at Scale',
  totalDuration: '2h 10m',
  lessons: [
  { id: 'les-013', title: 'Zustand vs Redux Toolkit — When to Use Which', duration: '18:30', isPreview: false, type: 'video' },
  { id: 'les-014', title: 'Setting Up Zustand Store', duration: '22:45', isPreview: false, type: 'video' },
  { id: 'les-015', title: 'Redux Toolkit with RTK Query', duration: '38:20', isPreview: false, type: 'video' },
  { id: 'les-016', title: 'Server State with TanStack Query', duration: '30:25', isPreview: false, type: 'video' }]

},
{
  id: 'sec-004',
  title: 'Building the Capstone Project',
  totalDuration: '3h 55m',
  lessons: [
  { id: 'les-017', title: 'Project Architecture and Planning', duration: '15:00', isPreview: false, type: 'video' },
  { id: 'les-018', title: 'Authentication with JWT and Refresh Tokens', duration: '42:10', isPreview: false, type: 'video' },
  { id: 'les-019', title: 'Real-Time Features with WebSockets', duration: '38:50', isPreview: false, type: 'video' },
  { id: 'les-020', title: 'Deployment to Vercel + Railway', duration: '28:15', isPreview: false, type: 'video' },
  { id: 'les-021', title: 'Project Resources & Starter Files', duration: 'Download', isPreview: false, type: 'resource' }]

}];


const reviewsReact: Review[] = [
{
  id: 'rev-001',
  author: 'Kenji Tanaka',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Kenji',
  rating: 5,
  date: 'April 2025',
  content: "This is hands-down the best React course I've ever taken. Angela's explanations are crystal clear, the projects are genuinely useful, and the pacing is perfect for someone coming from Vue.",
  helpful: 847
},
{
  id: 'rev-002',
  author: 'Fatima Al-Hassan',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Fatima',
  rating: 5,
  date: 'March 2025',
  content: "I landed a senior frontend role 3 weeks after completing this course. The hooks deep-dive and the state management section alone are worth 10x the price. Absolutely incredible value.",
  helpful: 612
},
{
  id: 'rev-003',
  author: 'Lucas Fernandez',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Lucas',
  rating: 4,
  date: 'February 2025',
  content: 'Great course overall. The capstone project is excellent. I would have liked more coverage of testing with React Testing Library, but the core material is stellar.',
  helpful: 289
},
{
  id: 'rev-004',
  author: 'Amara Diallo',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Amara',
  rating: 5,
  date: 'January 2025',
  content: "I've tried 4 other React courses and always got stuck at hooks. Angela's custom hooks section finally made it click. The visual diagrams she uses are unlike anything else out there.",
  helpful: 504
},
{
  id: 'rev-005',
  author: 'Yuki Watanabe',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Yuki',
  rating: 5,
  date: 'December 2024',
  content: 'Updated for React 19 when most courses are still on React 17. The useTransition section is gold. Angela clearly cares about keeping this current.',
  helpful: 398
},
{
  id: 'rev-006',
  author: 'Nikolai Petrov',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Nikolai',
  rating: 4,
  date: 'November 2024',
  content: 'Solid course with great production quality. The code editor setup section was a bit long, but everything after that was excellent. The RTK Query section saved me weeks of frustration.',
  helpful: 176
}];

export const courseSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');


// export const courses: Course[] = [
// {
//   id: 'course-001',
//   title: 'The Complete React 19 & Next.js Developer Bootcamp',
//   subtitle:
//     'Master modern React from hooks to full-stack apps with Next.js 15, TypeScript, Zustand, and real-world projects',
//   description:
//     'This is the most comprehensive React course available. You will master React 19, Next.js 15, TypeScript, state management, performance optimization, and deploy production-grade applications.',

//   image:
//     'https://img.rocket.new/generatedImages/rocket_gen_img_1b08b1565-1768009206975.png',
//   previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',

//   rating: 4.8,
//   reviewCount: 48920,
//   studentCount: 245891,

//   instructor: instructors[0],

//   category: 'Development',
//   subcategory: 'Web Development',
//   language: 'English',
//   level: 'All Levels',
//   lastUpdated: 'May 2025',

//   price: 14.99,
//   originalPrice: 119.99,

//   totalHours: 62,
//   totalLectures: 520,
//   totalArticles: 18,

//   hasCertificate: true,
//   hasLifetimeAccess: true,
//   hasMobileAccess: true,

//   badge: 'Bestseller',

//   whatYouWillLearn: [
//     'Build production-grade React apps with hooks, context, and suspense',
//     'Master React 19 features including Actions, useTransition, and server components',
//     'Implement full-stack apps with Next.js 15 App Router',
//     'Type-safe development with TypeScript from day one',
//     'State management with Zustand and Redux Toolkit',
//     'Server state caching with TanStack Query',
//     'Authentication with JWT, OAuth, and refresh token rotation',
//     'Deploy to Vercel, Railway, and AWS with CI/CD pipelines',
//     'Performance optimization: code splitting, lazy loading, memoization',
//     'Write comprehensive tests with Vitest and React Testing Library',
//     'Real-time features with WebSockets and Server-Sent Events',
//     'Build and publish a reusable component library to npm',
//   ],

//   requirements: [
//     'Basic JavaScript knowledge (variables, functions, arrays)',
//     'HTML and CSS fundamentals',
//     'No prior React experience needed',
//     'A computer with internet access — Mac, Windows, or Linux',
//   ],

//   // ✅ FIXED: curriculum must be an array
//   curriculum: [
//     {
//       id: 'sec-001',
//       title: 'Getting Started with React 19',
//       totalDuration: '1h 24m',
//       lessons: [
//         {
//           id: 'les-001',
//           title: 'Course Introduction & What We Will Build',
//           duration: '5:42',
//           isPreview: true,
//           type: 'video',
//         },
//         {
//           id: 'les-002',
//           title: 'Setting Up Your Development Environment',
//           duration: '12:18',
//           isPreview: true,
//           type: 'video',
//         },
//         {
//           id: 'les-003',
//           title: 'Understanding JSX and the Virtual DOM',
//           duration: '18:05',
//           isPreview: false,
//           type: 'video',
//         },
//         {
//           id: 'les-004',
//           title: 'Your First React Component',
//           duration: '14:30',
//           isPreview: false,
//           type: 'video',
//         },
//         {
//           id: 'les-005',
//           title: 'Props, State, and Re-renders',
//           duration: '22:10',
//           isPreview: false,
//           type: 'video',
//         },
//         {
//           id: 'les-006',
//           title: 'Section Quiz: React Fundamentals',
//           duration: '10 questions',
//           isPreview: false,
//           type: 'quiz',
//         },
//       ],
//     },
//   ],

//   // ✅ FIXED: reviews must be an array
//   reviews: [
//     {
//       id: 'rev-001',
//       author: 'Kenji Tanaka',
//       avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Kenji',
//       rating: 5,
//       date: 'April 2025',
//       content:
//         "This is hands-down the best React course I've ever taken. Angela's explanations are crystal clear, the projects are genuinely useful, and the pacing is perfect for someone coming from Vue.",
//       helpful: 847,
//     },
//   ],

//   tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Web Development'],
// },
// ];

export const courses: Course[] = [
  {
    id: 'course-001',
    title: 'Tally Prime',
    subtitle:
      'Learn Tally Prime from basics to advanced accounting with GST, inventory, and payroll management',

    description:
      'Master Tally Prime with practical accounting workflows, GST filing, inventory handling, payroll management, voucher entries, banking, and financial reporting.',

    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.7,
    reviewCount: 8420,
    studentCount: 45210,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'Accounting',
    language: 'English',
    level: 'Beginner',
    lastUpdated: 'May 2026',

    price: 0,
    originalPrice: 999,

    totalHours: 18,
    totalLectures: 86,
    totalArticles: 12,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Hot',

    whatYouWillLearn: [
      'Understand Tally Prime interface and navigation',
      'Create companies and manage accounting masters',
      'Record sales, purchase, payment, and receipt vouchers',
      'Manage GST transactions and taxation reports',
      'Handle inventory and stock management',
      'Generate balance sheet, P&L, and reports',
      'Bank reconciliation and payroll processing',
      'Print invoices and financial statements',
    ],

    requirements: [
      'No accounting experience required',
      'Basic computer knowledge',
      'Windows laptop or desktop recommended',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'Introduction to Tally Prime',
        totalDuration: '1h 20m',

        lessons: [
          {
            id: 'les-001',
            title: 'Welcome to Tally Prime',
            duration: '5:20',
            isPreview: true,
            type: 'video',
          },
          {
            id: 'les-002',
            title: 'Installing Tally Prime',
            duration: '11:45',
            isPreview: true,
            type: 'video',
          },
          {
            id: 'les-003',
            title: 'Understanding the Dashboard',
            duration: '14:20',
            isPreview: false,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Rahul Sharma',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Rahul',

        rating: 5,
        date: 'April 2026',

        content:
          'Very beginner friendly course. I learned accounting and GST filing step by step.',

        helpful: 312,
      },
    ],

    tags: [
      'Tally',
      'Accounting',
      'GST',
      'Finance',
      'Bookkeeping',
    ],
  },

  {
    id: 'course-002',
    title: 'GST in Tally',
    subtitle:
      'Learn GST accounting, returns, taxation, and invoicing inside Tally Prime',

    description:
      'Complete GST training using Tally Prime including GST setup, tax calculations, filing workflows, invoice creation, and reports.',

    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.6,
    reviewCount: 3920,
    studentCount: 18600,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'GST',
    language: 'English',
    level: 'Intermediate',
    lastUpdated: 'May 2026',

    price: 360,
    originalPrice: 1299,

    totalHours: 10,
    totalLectures: 54,
    totalArticles: 8,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Bestseller',

    whatYouWillLearn: [
      'Configure GST in Tally Prime',
      'Create GST invoices',
      'Handle CGST, SGST, and IGST',
      'Generate GST reports',
      'Understand GST returns',
      'Manage taxation entries',
    ],

    requirements: [
      'Basic accounting knowledge',
      'Tally basics recommended',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'GST Fundamentals',
        totalDuration: '58m',

        lessons: [
          {
            id: 'les-001',
            title: 'Introduction to GST',
            duration: '8:30',
            isPreview: true,
            type: 'video',
          },
          {
            id: 'les-002',
            title: 'GST Setup in Tally',
            duration: '16:10',
            isPreview: false,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Priya Mehta',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Priya',

        rating: 5,
        date: 'March 2026',

        content:
          'Excellent GST practical examples with Tally Prime.',

        helpful: 180,
      },
    ],

    tags: ['GST', 'Tally', 'Taxation', 'Accounting'],
  },

  {
    id: 'course-003',
    title: 'Diploma In Computer Accounting',
    subtitle:
      'Professional diploma course covering Tally, GST, Excel, payroll, and finance',

    description:
      'A complete diploma program designed for students and professionals who want to build accounting and office management skills.',

    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.9,
    reviewCount: 2140,
    studentCount: 9240,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'Diploma',
    language: 'English',
    level: 'All Levels',
    lastUpdated: 'May 2026',

    price: 2100,
    originalPrice: 5999,

    totalHours: 42,
    totalLectures: 210,
    totalArticles: 24,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Hot',

    whatYouWillLearn: [
      'Tally Prime accounting',
      'GST and taxation',
      'Advanced Excel',
      'Payroll and inventory',
      'Business accounting workflows',
      'Professional office skills',
    ],

    requirements: [
      'Basic computer knowledge',
      'No prior accounting experience needed',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'Computer Accounting Basics',
        totalDuration: '2h 10m',

        lessons: [
          {
            id: 'les-001',
            title: 'Introduction to Accounting',
            duration: '12:20',
            isPreview: true,
            type: 'video',
          },
          {
            id: 'les-002',
            title: 'Understanding Financial Terms',
            duration: '18:45',
            isPreview: false,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Amit Verma',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Amit',

        rating: 5,
        date: 'February 2026',

        content:
          'Very professional diploma course with practical accounting training.',

        helpful: 420,
      },
    ],

    tags: [
      'Tally',
      'Accounting',
      'Diploma',
      'Excel',
      'GST',
    ],
  },

  {
    id: 'course-004',
    title: 'GST',
    subtitle:
      'Master Goods and Services Tax concepts, filing, invoicing, and compliance',

    description:
      'Learn complete GST accounting including GST structure, returns, tax invoices, input tax credit, and compliance workflows.',

    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.5,
    reviewCount: 2840,
    studentCount: 15400,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'GST',
    language: 'English',
    level: 'Beginner',
    lastUpdated: 'May 2026',

    price: 360,
    originalPrice: 999,

    totalHours: 9,
    totalLectures: 48,
    totalArticles: 6,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Popular',

    whatYouWillLearn: [
      'Understand GST concepts',
      'Create GST invoices',
      'Calculate taxes properly',
      'Learn GST return filing',
      'Handle GST reports',
    ],

    requirements: [
      'Basic computer knowledge',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'GST Basics',
        totalDuration: '1h 10m',

        lessons: [
          {
            id: 'les-001',
            title: 'Introduction to GST',
            duration: '10:20',
            isPreview: true,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Sneha Kapoor',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Sneha',

        rating: 5,
        date: 'January 2026',

        content:
          'Simple explanations and very practical examples.',

        helpful: 140,
      },
    ],

    tags: ['GST', 'Tax', 'Accounting'],
  },

  {
    id: 'course-005',
    title: 'Tally Prime Advanced',
    subtitle:
      'Advanced Tally Prime course with inventory, payroll, banking, and taxation',

    description:
      'Take your Tally Prime skills to the next level with advanced accounting workflows and business management.',

    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.8,
    reviewCount: 4120,
    studentCount: 20120,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'Advanced Accounting',
    language: 'English',
    level: 'Advanced',
    lastUpdated: 'May 2026',

    price: 450,
    originalPrice: 1499,

    totalHours: 16,
    totalLectures: 92,
    totalArticles: 10,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Advanced',

    whatYouWillLearn: [
      'Advanced voucher entries',
      'Payroll management',
      'Inventory management',
      'Bank reconciliation',
      'Financial reporting',
    ],

    requirements: [
      'Basic Tally knowledge required',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'Advanced Tally Features',
        totalDuration: '1h 35m',

        lessons: [
          {
            id: 'les-001',
            title: 'Advanced Accounting Setup',
            duration: '15:20',
            isPreview: true,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Karan Patel',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Karan',

        rating: 5,
        date: 'March 2026',

        content:
          'Excellent advanced accounting training.',

        helpful: 202,
      },
    ],

    tags: ['Tally', 'Accounting', 'Finance'],
  },

  {
    id: 'course-006',
    title: 'SMART TALLY XPERT',
    subtitle:
      'Become a professional Tally expert with complete business accounting training',

    description:
      'Professional-level Tally training including GST, inventory, payroll, taxation, reporting, and advanced accounting.',

    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.9,
    reviewCount: 3240,
    studentCount: 11920,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'Professional',
    language: 'English',
    level: 'All Levels',
    lastUpdated: 'May 2026',

    price: 2290,
    originalPrice: 6999,

    totalHours: 48,
    totalLectures: 240,
    totalArticles: 22,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Premium',

    whatYouWillLearn: [
      'Master Tally Prime',
      'Advanced GST accounting',
      'Payroll processing',
      'Inventory management',
      'Business finance workflows',
    ],

    requirements: [
      'Basic computer knowledge',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'Professional Tally Training',
        totalDuration: '2h 10m',

        lessons: [
          {
            id: 'les-001',
            title: 'Getting Started with Smart Tally',
            duration: '18:30',
            isPreview: true,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Anjali Shah',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Anjali',

        rating: 5,
        date: 'April 2026',

        content:
          'Very detailed and job oriented training program.',

        helpful: 388,
      },
    ],

    tags: ['Tally', 'GST', 'Accounting', 'Professional'],
  },

  {
    id: 'course-007',
    title: 'Smart Tally Specialist',
    subtitle:
      'Specialized Tally training for accounting professionals and office staff',

    description:
      'Learn specialized accounting and taxation workflows inside Tally Prime for real businesses.',

    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',

    previewVideo:
      'https://www.w3schools.com/html/mov_bbb.mp4',

    rating: 4.7,
    reviewCount: 2140,
    studentCount: 9480,

    instructor: instructors[0],

    category: 'Tally',
    subcategory: 'Specialist',
    language: 'English',
    level: 'Intermediate',
    lastUpdated: 'May 2026',

    price: 1260,
    originalPrice: 3499,

    totalHours: 28,
    totalLectures: 132,
    totalArticles: 16,

    hasCertificate: true,
    hasLifetimeAccess: true,
    hasMobileAccess: true,

    badge: 'Recommended',

    whatYouWillLearn: [
      'Accounting specialization',
      'GST management',
      'Advanced reporting',
      'Inventory workflows',
      'Business accounting',
    ],

    requirements: [
      'Basic Tally knowledge',
    ],

    curriculum: [
      {
        id: 'sec-001',
        title: 'Specialized Accounting',
        totalDuration: '1h 42m',

        lessons: [
          {
            id: 'les-001',
            title: 'Professional Accounting Workflow',
            duration: '14:12',
            isPreview: true,
            type: 'video',
          },
        ],
      },
    ],

    reviews: [
      {
        id: 'rev-001',
        author: 'Vikas Jain',
        avatar:
          'https://api.dicebear.com/7.x/personas/svg?seed=Vikas',

        rating: 5,
        date: 'February 2026',

        content:
          'Great course for accounting professionals.',

        helpful: 177,
      },
    ],

    tags: ['Tally', 'Accounting', 'GST'],
  }
];

export const categories: Category[] = [
  {
    id: 'cat-001',
    name: 'Tally',
    icon: 'Calculator',
    courseCount: 4200,
    color: '#3b82f6',
  },
  {
    id: 'cat-002',
    name: 'SPEFL',
    icon: 'Languages',
    courseCount: 1800,
    color: '#8b5cf6',
  },
  {
    id: 'cat-003',
    name: 'IT-ITeS',
    icon: 'Laptop',
    courseCount: 5300,
    color: '#10b981',
  },
  {
    id: 'cat-004',
    name: 'Excel',
    icon: 'Sheet',
    courseCount: 6100,
    color: '#22c55e',
  },
  {
    id: 'cat-005',
    name: 'ES',
    icon: 'BookOpen',
    courseCount: 2400,
    color: '#f59e0b',
  },
  {
    id: 'cat-006',
    name: 'CSD',
    icon: 'GraduationCap',
    courseCount: 3200,
    color: '#ef4444',
  },
  {
    id: 'cat-007',
    name: 'B&W',
    icon: 'Briefcase',
    courseCount: 2700,
    color: '#6366f1',
  },
  {
    id: 'cat-008',
    name: 'AS',
    icon: 'Users',
    courseCount: 1900,
    color: '#ec4899',
  },
  {
    id: 'cat-009',
    name: 'AIR - TALLY',
    icon: 'BadgeCheck',
    courseCount: 1500,
    color: '#14b8a6',
  },
  {
    id: 'cat-010',
    name: 'AIR - EXCEL',
    icon: 'FileSpreadsheet',
    courseCount: 1700,
    color: '#f97316',
  },
];

// export const categories: Category[] = [
// { id: 'cat-001', name: 'Web Development', icon: 'Code2', courseCount: 12800, color: '#3b82f6' },
// { id: 'cat-002', name: 'Data Science', icon: 'BarChart3', courseCount: 8400, color: '#8b5cf6' },
// { id: 'cat-003', name: 'Mobile Development', icon: 'Smartphone', courseCount: 5200, color: '#10b981' },
// { id: 'cat-004', name: 'UI/UX Design', icon: 'Pen', courseCount: 6800, color: '#f59e0b' },
// { id: 'cat-005', name: 'Cloud & DevOps', icon: 'Cloud', courseCount: 4100, color: '#ef4444' },
// { id: 'cat-006', name: 'Cybersecurity', icon: 'Shield', courseCount: 3200, color: '#6366f1' },
// { id: 'cat-007', name: 'Digital Marketing', icon: 'TrendingUp', courseCount: 7600, color: '#ec4899' },
// { id: 'cat-008', name: 'Business & Finance', icon: 'Briefcase', courseCount: 9100, color: '#14b8a6' },
// { id: 'cat-009', name: 'Machine Learning', icon: 'Brain', courseCount: 3800, color: '#f97316' },
// { id: 'cat-010', name: 'Photography', icon: 'Camera', courseCount: 2900, color: '#84cc16' }];


export const testimonials: Testimonial[] = [
{
  id: 'test-001',
  name: 'Zoe Nakamura',
  role: 'Frontend Engineer',
  company: 'Stripe',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Zoe',
  content: "I went from writing basic HTML to landing a role at Stripe in 8 months. LearnForge's structured path kept me on track and the project-based learning meant I had a portfolio before I finished.",
  rating: 5
},
{
  id: 'test-002',
  name: 'Rahul Mehta',
  role: 'Data Scientist',
  company: 'Netflix',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Rahul',
  content: "The ML Bootcamp is exceptional. Marcus's ability to explain gradient descent intuitively and then immediately show you the code is rare. I refer back to these lessons even now at Netflix.",
  rating: 5
},
{
  id: 'test-003',
  name: 'Sofia Andersson',
  role: 'Product Designer',
  company: 'Notion',
  avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sofia',
  content: "Priya's design systems course completely changed how I approach Figma. I built our entire component library at Notion using the patterns she teaches. Worth every penny.",
  rating: 5
}];