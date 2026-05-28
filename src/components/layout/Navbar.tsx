'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import {
  Search,
  ShoppingCart,
  Bell,
  Globe,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  User,
  Heart,
} from 'lucide-react';

import * as Icons from 'lucide-react';

import { useRef } from 'react';

import { LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';

import AuthButtons from '../auth/AuthButtons';
import UserMenu from '../auth/UserMenu';
import { useAuthStore } from '@/store/auth.store';
import SearchBar from '@/app/(public)/components/home/SearchBar';
import { categoryApi } from '@/api/category.api';
import { useQuery } from '@tanstack/react-query';
import { colors } from '@/data/color';

const navCategories = [
  { label: 'Development', href: '/courses"' },
  { label: 'Data Science', href: '/courses' },
  { label: 'Design', href: '/courses' },
  { label: 'Marketing', href: '/courses' },
  { label: 'IT & Software', href: '/courses' },
  { label: 'Business', href: '/courses' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement | null>(null);

  const user = useAuthStore((state) => state.user);

  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement | null>(null);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategory,
  });

  console.log("categories in Navbar", categories);

  const getRandomColor = (id: string) => {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (catRef.current && !catRef.current.contains(event.target as Node)) {
  //       setCatOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const dashboardRoute =
    user?.role === 'SUPERADMIN'
      ? '/admin/dashboard'
      : user?.role === 'INSTRUCTOR'
      ? '/instructor/dashboard'
      : '/dashboard';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-sticky' : 'shadow-none border-b border-border'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <AppLogo size={164} />
            {/* <span className="font-extrabold text-lg text-foreground hidden sm:block tracking-tight">
              LearnForge
            </span> */}
          </Link>

          {/* Categories dropdown */}
          <div className="hidden md:flex items-center gap-1 relative" ref={catRef}>
            <button
              onClick={() => setCatOpen((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted"
            >
              Categories
              <ChevronDown
                size={14}
                className={`transition-transform ${catOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {catOpen && (
              <div
                className="absolute left-0 top-full w-72 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                style={{ marginTop: '8px' }}
              >
                <div className="max-h-[calc(100vh-5rem)] overflow-y-auto py-2">
                  {categories.map((cat: any) => {
                    const Icon =
                      (Icons as any)[cat.icon] || Icons.BookOpen;

                        const color = getRandomColor(cat.id);

                    return (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        onClick={() => setCatOpen(false)}
                      >
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: `${color}20`,
                          }}
                        >
                          <Icon
                            size={16}
                            style={{ color }}
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {cat.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {cat.courses.length.toLocaleString()} courses
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search bar */}
           <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              {/*<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-full text-sm bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />*/}
              <SearchBar />
            </div>
          </div> 

          {/* Nav links */}
          {/* <div className="hidden lg:flex items-center gap-1 ml-auto">
            {navCategories?.slice(0, 3)?.map((cat) => (
              <Link
                key={`nav-cat-${cat?.label}`}
                href={cat?.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted"
              >
                {cat?.label}
              </Link>
            ))}
          </div> */}

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <Link
              href="/courses"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary rounded-lg px-4 py-2 hover:bg-primary-light transition-colors"
            >
              <BookOpen size={15} />
              Teach
            </Link>

            <Link href="/wishlist" className="relative p-2 rounded-lg hover:bg-muted transition-colors text-foreground" aria-label="Wishlist">
              <Heart size={20} />
            </Link>

            <Link href="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors text-foreground" aria-label="Cart">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                0
              </span>
            </Link>

            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground hidden md:flex" aria-label="Notifications">
              <Bell size={20} />
            </button>

            {/* <button className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm ml-1" aria-label="Profile">
              <User size={16} />
            </button> */}

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div
                  className="relative"
                  ref={profileRef}
                >
                  <button
                    onClick={() =>
                      setProfileOpen(
                        !profileOpen
                      )
                    }
                    className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold text-sm ml-1" aria-label="Profile">
                      <User size={16} />
                    </div>

                    {/* <div className="text-left">
                      <p className="text-sm font-semibold leading-none">
                        {user.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {user.role}
                      </p>
                    </div> */}

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        profileOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
                      <div className="border-b border-border p-4">
                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push(
                              dashboardRoute
                            );

                            setProfileOpen(
                              false
                            );
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
                        >
                          <LayoutDashboard
                            size={18}
                          />

                          Dashboard
                        </button>

                        {/* <button
                          onClick={() => {
                            router.push(
                              '/dashboard/my-courses'
                            );

                            setProfileOpen(
                              false
                            );
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
                        >
                          <BookOpen
                            size={18}
                          />

                          My Learning
                        </button> */}

                        <button
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                        >
                          <LogOut size={18} />

                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
         <div className="md:hidden px-4 pb-3 border-t border-border">
          <div className="relative mt-3">
            {/*<Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-full text-sm bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />*/}
            <SearchBar />
          </div>
        </div> 
      </nav>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-modal animate-slide-up overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AppLogo size={32} />
                <span className="font-extrabold text-foreground">LearnForge</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <p className="section-label mb-3">Browse</p>
              {/* {navCategories?.map((cat) => (
                <Link
                  key={`mobile-nav-${cat?.label}`}
                  href={cat?.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat?.label}
                </Link>
              ))} */}
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  All Courses
                </Link>
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    {/* <Link
                      href="/my-learning"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      <BookOpen size={18} />
                      My Learning
                    </Link> */}

                    <button
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium text-left"
                      onClick={() => {
                        // logout logic
                        setMobileOpen(false);
                      }}
                    >
                      <Icons.LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="w-full text-center py-2.5 rounded-lg border border-border font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log in
                    </Link>

                    <Link
                      href="/register"
                      className="w-full text-center py-2.5 rounded-lg bg-primary text-white font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border mt-4 flex items-center gap-2">
                <Globe size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">English</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}