'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';

import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Lock,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getYoutubeEmbedUrl } from '@/lib/helper/youtubePlayer';
import { Course, Lesson } from '@/types/course.types';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  lesson?: Lesson;
}

export default function VideoPreviewModal({
  isOpen,
  onClose,
  course,
  lesson
}: VideoPreviewModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("course in VideoPreviewModal:", course);

  const previewLessons = useMemo(() => {
    return (
      course.curriculum
        ?.flatMap((section) => section.lessons || [])
        .filter((lesson) => lesson.isPreview) || []
    );
  }, [course]);

  // const [activeLessonId, setActiveLessonId] = useState(
  //   previewLessons?.[0]?.id || ''
  // );

  const [activeLessonId, setActiveLessonId] =
  useState<string | null>(null);

  // const activeLesson =
  //   previewLessons.find(
  //     (lesson) => lesson.id === activeLessonId
  //   ) || previewLessons?.[0];

  const activeLesson = previewLessons.find(
    (lesson) => lesson.id === activeLessonId
  );

  // const currentVideo =
  //   activeLesson?.videoUrl || course.previewVideo;

  const currentVideo = activeLesson
    ? activeLesson.videoUrl
    : course.previewVideo;

  const videoUrl =
  lesson?.videoUrl || course.previewVideo;

  const [playing, setPlaying] = useState(false);

  const [muted, setMuted] = useState(false);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    if (previewLessons.length > 0) {
      setActiveLessonId(previewLessons[0].id);
    }
  }, [previewLessons]);

  useEffect(() => {
    if (!isOpen) {
      setPlaying(false);

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  // autoplay when lesson changes
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.load();

    videoRef.current
      .play()
      .then(() => {
        setPlaying(true);
      })
      .catch(() => {
        setPlaying(false);
      });
  }, [currentVideo]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const pct =
      (videoRef.current.currentTime /
        videoRef.current.duration) *
      100;

    setProgress(isNaN(pct) ? 0 : pct);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!videoRef.current) return;

    const rect =
      e.currentTarget.getBoundingClientRect();

    const pct =
      (e.clientX - rect.left) / rect.width;

    videoRef.current.currentTime =
      pct * videoRef.current.duration;
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return '0:00';

    const m = Math.floor(s / 60);

    const sec = Math.floor(s % 60);

    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const currentTime = videoRef.current
    ? videoRef.current.currentTime
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* BACKDROP */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.93,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.93,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-hero-bg shadow-modal lg:flex-row"
            style={{ maxHeight: '90vh' }}
          >
            {/* VIDEO PANEL */}

            <div className="flex min-w-0 flex-1 flex-col bg-black">
              {/* HEADER */}

              <div className="flex items-center justify-between bg-hero-bg/90 px-4 py-3">
                <div>
                  <p className="line-clamp-1 text-sm font-semibold text-white">
                    {activeLesson?.title ||
                      course.title}
                  </p>

                  <p className="mt-0.5 text-xs text-white/50">
                    Free Preview Lesson
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X size={16} />
                </button>
              </div>

              {/* VIDEO */}

              <div className="relative aspect-video flex-1 bg-black">
                {currentVideo?.includes(
                  'youtube.com'
                ) ||
                currentVideo?.includes(
                  'youtu.be'
                ) ? (
                  <iframe
                    className="h-full w-full"
                    src={getYoutubeEmbedUrl(
                      currentVideo
                    )}
                    title={
                      activeLesson?.title ||
                      course.title
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    key={currentVideo}
                    ref={videoRef}
                    src={currentVideo}
                    className="h-full w-full object-contain"
                    onTimeUpdate={
                      handleTimeUpdate
                    }
                    onLoadedMetadata={
                      handleLoadedMetadata
                    }
                    onEnded={() =>
                      setPlaying(false)
                    }
                    muted={muted}
                    playsInline
                    controls={false}
                  />
                )}

                {!playing && (
                  <div
                    className="group absolute inset-0 flex cursor-pointer items-center justify-center"
                    onClick={togglePlay}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 group-hover:scale-110 group-hover:bg-white/30">
                      <Play
                        size={32}
                        className="ml-1.5 fill-white text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CONTROLS */}

              <div className="bg-hero-bg/95 px-4 py-3">
                {/* PROGRESS */}

                <div
                  className="group relative mb-3 h-1.5 cursor-pointer rounded-full bg-white/20"
                  onClick={handleProgressClick}
                >
                  <div
                    className="relative h-full rounded-full bg-primary"
                    style={{
                      width: `${progress}%`,
                    }}
                  >
                    <div className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="text-white/70 transition-colors hover:text-white"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime -= 10;
                      }
                    }}
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/90"
                  >
                    {playing ? (
                      <Pause
                        size={16}
                        className="text-foreground"
                      />
                    ) : (
                      <Play
                        size={16}
                        className="ml-0.5 fill-foreground text-foreground"
                      />
                    )}
                  </button>

                  <button
                    className="text-white/70 transition-colors hover:text-white"
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime += 10;
                      }
                    }}
                  >
                    <SkipForward size={18} />
                  </button>

                  <span className="ml-1 text-xs font-tabular text-white/60">
                    {formatTime(currentTime)} /{' '}
                    {formatTime(duration)}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={() =>
                        setMuted(!muted)
                      }
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {muted ? (
                        <VolumeX size={18} />
                      ) : (
                        <Volume2 size={18} />
                      )}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={
                        muted ? 0 : volume
                      }
                      onChange={(e) => {
                        const v = parseFloat(
                          e.target.value
                        );

                        setVolume(v);

                        if (videoRef.current) {
                          videoRef.current.volume =
                            v;
                        }

                        if (v > 0) {
                          setMuted(false);
                        }
                      }}
                      className="hidden w-20 accent-primary sm:block"
                    />

                    <button
                      className="text-white/70 transition-colors hover:text-white"
                      onClick={() =>
                        videoRef.current?.requestFullscreen()
                      }
                    >
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* PLAYLIST */}

            <div className="flex max-h-64 w-full flex-col overflow-hidden bg-hero-card lg:max-h-none lg:w-72">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                  Course Content
                </p>

                <p className="mt-0.5 text-xs text-white/50">
                  {
                    previewLessons.length
                  }{' '}
                  preview lessons
                </p>
              </div>

              <button
                onClick={() => setActiveLessonId(null)}
                className={`flex w-full items-start gap-3 border-l-2 px-4 py-3.5 text-left transition-colors ${
                  activeLessonId === null
                    ? 'border-primary bg-primary/20'
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      activeLessonId === null
                        ? 'bg-primary'
                        : 'bg-white/10'
                    }`}
                  >
                    <Play
                      size={11}
                      className="ml-0.5 fill-white text-white"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs leading-snug text-white/90">
                    Course Preview
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-xs font-medium text-primary">
                      <Eye size={10} />
                      Preview
                    </span>
                  </div>
                </div>
              </button>

              <div className="scrollbar-hide flex-1 overflow-y-auto">
                {course.curriculum
                  ?.flatMap(
                    (section) =>
                      section.lessons || []
                  )
                  .map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (
                          item.isPreview
                        ) {
                          setActiveLessonId(
                            item.id
                          );
                        }
                      }}
                      className={`flex w-full items-start gap-3 border-l-2 px-4 py-3.5 text-left transition-colors ${
                        activeLessonId ===
                        item.id
                          ? 'border-primary bg-primary/20'
                          : 'border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.isPreview ? (
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${
                              activeLessonId ===
                              item.id
                                ? 'bg-primary'
                                : 'bg-white/10'
                            }`}
                          >
                            <Play
                              size={11}
                              className="ml-0.5 fill-white text-white"
                            />
                          </div>
                        ) : (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5">
                            <Lock
                              size={11}
                              className="text-white/40"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`line-clamp-2 text-xs leading-snug ${
                            item.isPreview
                              ? 'text-white/90'
                              : 'text-white/40'
                          }`}
                        >
                          {i + 1}. {item.title}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs font-tabular text-white/40">
                            {item.duration}
                          </span>

                          {item.isPreview && (
                            <span className="flex items-center gap-0.5 text-xs font-medium text-primary">
                              <Eye size={10} />
                              Preview
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}