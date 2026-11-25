'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, HeartHandshake, Pause, Play, Sparkles, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';

/**
 * Portrait (9:16) practice video in a phone-style frame, with the teaching
 * approach beside it. Restored from the earlier site and restyled in the
 * Dharana palette.
 */
export default function VideoStory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    // Respect reduced-motion: don't autoplay, let the visitor start it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section id="video" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* Soft blush glow behind the frame */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/60 blur-3xl"
        aria-hidden
      />

      <div className="brand-container relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait video frame */}
        <div className="flex flex-col items-center lg:col-span-5">
          <div className="group relative w-full max-w-[340px] sm:max-w-[370px]">
            <div
              className="absolute -inset-2 -z-10 rounded-[3rem] bg-gradient-to-tr from-rose/40 via-blush/40 to-clay/20 opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden
            />

            <div className="relative aspect-[9/16] select-none overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-umber shadow-2xl shadow-umber/20 ring-1 ring-umber/10">
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="metadata"
                onClick={togglePlay}
                className="h-full w-full cursor-pointer object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                aria-label="Practice video: the lake is chitta and the waves are vrittis"
              >
                <source src="/videos/yoga-hero.mp4" type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

              {/* Top bar */}
              <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                  <span className={`h-2 w-2 rounded-full bg-blush ${isPlaying ? 'animate-pulse' : ''}`} />
                  In the flow
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/85">Dharana · Yoga</span>
              </div>

              {/* Centre play/pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 shadow-2xl backdrop-blur-md transition-all duration-150 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory ${
                  isPlaying ? 'scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100' : 'scale-100 opacity-100'
                }`}
              >
                {isPlaying ? <Pause className="h-7 w-7 text-umber" /> : <Play className="ml-1 h-8 w-8 fill-umber text-umber" />}
              </button>

              {/* Bottom bar */}
              <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between">
                <span className="pointer-events-none text-xs text-white/90 drop-shadow">
                  {isPlaying ? 'Tap to pause' : 'Tap to play'}
                </span>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ivory"
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-blush" />}
                  {isMuted ? 'Unmute' : 'Sound on'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-7 lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-blush-light px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-clay">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            A glimpse into the practice
          </span>

          <h2 className="font-serif text-4xl font-medium italic leading-[1.1] text-umber sm:text-5xl">
            Move with intention.
            <br />
            Breathe with quiet grace.
          </h2>

          <p className="text-base font-light leading-relaxed text-umber-light sm:text-lg">
            This is how we teach: unhurried, anchored in the breath, and attentive to the natural mechanics of your
            spine. We don’t rush transitions or force extremes. We build stability, space and calm.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/80 p-5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush-light text-clay">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-medium text-umber">Spine and neck care</h3>
                <p className="mt-0.5 font-light text-umber-muted">
                  Sequences that ease the stiffness of desk posture and shallow breathing.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-white/80 p-5">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blush-light text-clay">
                <HeartHandshake className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-medium text-umber">Attentive personal corrections</h3>
                <p className="mt-0.5 font-light text-umber-muted">
                  Live feedback in small groups, so your alignment is checked and your practice stays safe.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link href="/#services" className="btn-primary">
              Explore what we offer
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="max-w-xs text-sm italic text-umber-muted">
              “Yoga is not about touching your toes. It is about what you learn on the way down.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
