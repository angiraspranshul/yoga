'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function VideoStorySection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="story" className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-cream overflow-hidden">
      {/* Background decorative subtle blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-light/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Portrait 9:16 Video Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Outer ambient glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sage/30 via-gold/20 to-sage/10 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 -z-10" />

              {/* Phone/Editorial curved portrait bezel */}
              <div
                onClick={togglePlay}
                className="relative cursor-pointer overflow-hidden rounded-[2.5rem] bg-neutral-900 border-[6px] border-white/95 shadow-2xl shadow-olive/15 aspect-[9/16] ring-1 ring-black/10 select-none"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                >
                  <source src="/videos/yoga-hero.mp4" type="video/mp4" />
                </video>

                {/* Subtle top and bottom vignette overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />

                {/* Top Floating Status Pill */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-sans tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>In the Flow</span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/80">
                    DHAARNA · YOGA
                  </span>
                </div>

                {/* Center Floating Play/Pause Indicator on hover or when paused */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl backdrop-blur-md transition-all duration-300 z-20 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100' : 'opacity-100 scale-100'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="h-7 w-7 text-olive" />
                  ) : (
                    <Play className="ml-1 h-8 w-8 text-olive fill-olive" />
                  )}
                </div>

                {/* Bottom Bar: Sound Toggle + Guidance */}
                <div className="absolute bottom-5 left-4 right-4 flex items-center justify-between z-20">
                  <span className="text-xs text-white/90 font-sans drop-shadow-md">
                    {isPlaying ? 'Tap to pause' : 'Tap to play'}
                  </span>

                  <button
                    onClick={toggleMute}
                    aria-label="Toggle audio"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/55 hover:bg-black/80 text-white text-xs backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span className="font-sans text-[11px]">Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-sans text-[11px]">Sound On</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-olive/50 font-sans tracking-wide">
              9:16 Portrait Practice · Dhaarna Sharma
            </p>
          </div>

          {/* RIGHT: Editorial Content & Practice Context */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage-light text-sage-dark text-xs font-sans font-medium uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Glimpse into the Practice</span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-5xl text-olive leading-tight">
              Move with intention.<br />
              Breathe with quiet grace.
            </h2>

            <p className="text-base sm:text-lg text-olive/75 leading-relaxed font-sans font-light">
              Here is how Dhaarna teaches — unhurried, breath-anchored, and intensely focused on the natural mechanics of your spine. We do not rush transitions or force extremes. We build stability, space, and somatic calm.
            </p>

            {/* 2 Focused Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 border border-cream-dark shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sage-light text-sage flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-olive">Spine &amp; Neck Restoration</h4>
                  <p className="text-xs sm:text-sm text-olive/65 font-light font-sans mt-0.5">
                    Targeted sequencing designed specifically to relieve stiffness from daily computer desk posture and shallow breathing patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/80 border border-cream-dark shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sage-light text-sage flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-olive">Attentive Personal Corrections</h4>
                  <p className="text-xs sm:text-sm text-olive/65 font-light font-sans mt-0.5">
                    Live feedback in intimate small cohorts (capped at 15) so your alignment is verified and your practice stays safe.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote + CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                href="#classes"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-olive hover:bg-olive-light text-cream font-sans font-medium text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Explore Cohort Plans</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-xs text-olive/60 font-sans italic max-w-xs">
                &ldquo;Yoga is not about touching your toes. It is about what you learn on the way down.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
