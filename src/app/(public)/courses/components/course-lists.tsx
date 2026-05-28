'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, SlidersHorizontal, X, ChevronDown, ChevronUp, Grid3X3, List } from 'lucide-react';
import CourseCard from '@/components/course/CourseCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useCourses } from '@/queries/useCourses';

const ratingFilters = [
  { id: 'rating-45', label: '4.5 & up', value: 4.5, count: 7842 },
  { id: 'rating-40', label: '4.0 & up', value: 4.0, count: 14290 },
  { id: 'rating-35', label: '3.5 & up', value: 3.5, count: 18640 },
];

const durationFilters = [
  { id: 'dur-short', label: '0–2 Hours', value: 'short' },
  { id: 'dur-medium', label: '3–6 Hours', value: 'medium' },
  { id: 'dur-long', label: '7–16 Hours', value: 'long' },
  { id: 'dur-extra', label: '17+ Hours', value: 'extra' },
];

const levelFilters = [
  { id: 'level-all', label: 'All Levels', value: 'All Levels' },
  { id: 'level-beginner', label: 'Beginner', value: 'Beginner' },
  { id: 'level-intermediate', label: 'Intermediate', value: 'Intermediate' },
  { id: 'level-advanced', label: 'Advanced', value: 'Advanced' },
];

const categoryFilters = [
  { id: 'cat-dev', label: 'Development', value: 'Development' },
  { id: 'cat-ds', label: 'Data Science', value: 'Data Science' },
  { id: 'cat-design', label: 'Design', value: 'Design' },
  { id: 'cat-it', label: 'IT & Software', value: 'IT & Software' },
  { id: 'cat-marketing', label: 'Marketing', value: 'Marketing' },
];

const sortOptions = [
  { id: 'sort-popular', label: 'Most Popular' },
  { id: 'sort-newest', label: 'Newest First' },
  { id: 'sort-rating', label: 'Highest Rated' },
  { id: 'sort-price-low', label: 'Price: Low to High' },
  { id: 'sort-price-high', label: 'Price: High to Low' },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-5 mb-5">
      <button
        className="flex items-center justify-between w-full mb-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseListingContent() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('sort-popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  const {
    data,
    isLoading,
    error,
  } = useCourses({
    page: 1,
    limit: 8,
  });

  const courses = data?.data?.courses || [];
  const pagination = data?.meta;

  console.log("Courses in CourseListingContent", courses);
  console.log("Pagination in CourseListingContent", pagination);

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // SEARCH FILTER FROM URL
    if (searchQuery.trim()) {
      result = result.filter((course) =>
        course.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    // RATING FILTER
    if (selectedRating) {
      result = result.filter(
        (c) => c.rating >= selectedRating
      );
    }

    // LEVEL FILTER
    if (selectedLevels.length) {
      result = result.filter((c) =>
        selectedLevels.includes(c.level)
      );
    }

    // CATEGORY FILTER
    if (selectedCategories.length) {
      result = result.filter((c) =>
        selectedCategories.includes(c.category)
      );
    }

    // DURATION FILTER
    if (selectedDurations.length) {
      result = result.filter((c) => {
        if (
          selectedDurations.includes('short') &&
          c.totalHours <= 2
        )
          return true;

        if (
          selectedDurations.includes('medium') &&
          c.totalHours >= 3 &&
          c.totalHours <= 6
        )
          return true;

        if (
          selectedDurations.includes('long') &&
          c.totalHours >= 7 &&
          c.totalHours <= 16
        )
          return true;

        if (
          selectedDurations.includes('extra') &&
          c.totalHours >= 17
        )
          return true;

        return false;
      });
    }

    // SORTING
    if (sortBy === 'sort-rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === 'sort-price-low') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'sort-price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === 'sort-newest') {
      result.sort(
        (a, b) => b.reviewCount - a.reviewCount
      );
    }

    return result;
  }, [
    courses,
    searchQuery,
    selectedRating,
    selectedDurations,
    selectedLevels,
    selectedCategories,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / perPage);
  const paginatedCourses = filteredCourses.slice((page - 1) * perPage, page * perPage);

  const hasActiveFilters =
    selectedRating !== null ||
    selectedDurations.length > 0 ||
    selectedLevels.length > 0 ||
    selectedCategories.length > 0;

  const clearAllFilters = () => {
    setSelectedRating(null);
    setSelectedDurations([]);
    setSelectedLevels([]);
    setSelectedCategories([]);
    setPage(1);
  };

  const SidebarFilters = () => (
    <div className="space-y-0">
      {hasActiveFilters && (
        <div className="mb-5 pb-5 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Active Filters</span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
          >
            <X size={12} /> Clear all
          </button>
        </div>
      )}

      <FilterSection title="Rating">
        <div className="space-y-2.5">
          {ratingFilters.map((f) => (
            <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === f.value}
                onChange={() => { setSelectedRating(f.value); setPage(1); }}
                className="filter-checkbox"
              />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={`fstar-${f.id}-${s}`}
                    className={`text-xs ${s <= Math.round(f.value) ? 'text-amber-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {f.label}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">({f.count.toLocaleString()})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Duration">
        <div className="space-y-2.5">
          {durationFilters.map((f) => (
            <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDurations.includes(f.value)}
                onChange={() => { toggleArray(selectedDurations, f.value, setSelectedDurations); setPage(1); }}
                className="filter-checkbox"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{f.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Level">
        <div className="space-y-2.5">
          {levelFilters.map((f) => (
            <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedLevels.includes(f.value)}
                onChange={() => { toggleArray(selectedLevels, f.value, setSelectedLevels); setPage(1); }}
                className="filter-checkbox"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{f.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-2.5">
          {categoryFilters.map((f) => (
            <label key={f.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(f.value)}
                onChange={() => { toggleArray(selectedCategories, f.value, setSelectedCategories); setPage(1); }}
                className="filter-checkbox"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{f.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">All Courses</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {searchQuery
            ? `Search results for "${searchQuery}"`
            : 'All Courses'}
        </h1>

        <p className="text-muted-foreground text-sm mt-1">
          {filteredCourses.length.toLocaleString()} results found
        </p>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-5">
          {selectedRating && (
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
              {selectedRating}+ stars
              <button onClick={() => setSelectedRating(null)}><X size={12} /></button>
            </span>
          )}
          {selectedLevels.map((l) => (
            <span key={`chip-level-${l}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
              {l}
              <button onClick={() => toggleArray(selectedLevels, l, setSelectedLevels)}><X size={12} /></button>
            </span>
          ))}
          {selectedCategories.map((c) => (
            <span key={`chip-cat-${c}`} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
              {c}
              <button onClick={() => toggleArray(selectedCategories, c, setSelectedCategories)}><X size={12} /></button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="sticky top-24 bg-white border border-border rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-primary" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <SidebarFilters />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Sort + view bar */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <button
              className="lg:hidden flex items-center gap-2 border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {(selectedRating ? 1 : 0) + selectedLevels.length + selectedCategories.length + selectedDurations.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="border border-border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Grid view"
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Course grid / list */}
          {paginatedCourses.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses match your filters</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Try adjusting your filter criteria to find more courses.
              </p>
              <button onClick={clearAllFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
              {paginatedCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} variant="horizontal" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredCourses.length)} of{' '}
                {filteredCourses.length} courses
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={`page-${p}`}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                      p === page
                        ? 'bg-primary text-white font-semibold' :'border border-border hover:bg-muted text-foreground'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
            >
              <div className="p-5 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="font-semibold text-foreground">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                <SidebarFilters />
              </div>
              <div className="sticky bottom-0 p-4 bg-white border-t border-border">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Show {filteredCourses.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}