'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function VideoStorySection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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
    <section id="story" className="mx-auto max-w-4xl px-6 py-12 sm:py-16 bg-cream">
      <div
        onClick={togglePlay}
        className="group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-xl shadow-olive/10 border border-cream-dark/60 aspect-video bg-neutral-900"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          poster="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80"
        >
          <source src="/videos/yoga-hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 bg-olive/15 transition-colors duration-300 group-hover:bg-olive/10" />

        {/* Center Floating Play/Pause Indicator on hover or when paused */}
        <div
          className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 shadow-lg backdrop-blur transition-all duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100' : 'opacity-100 scale-100'
          }`}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 text-olive" />
          ) : (
            <Play className="ml-1 h-8 w-8 text-olive fill-olive" />
          )}
        </div>

        {/* Bottom Bar Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
          <button
            onClick={toggleMute}
            aria-label="Toggle audio"
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <p className="mt-5 text-center text-xs sm:text-sm text-olive/50 font-sans tracking-wide">
        Watch Dhaarna&apos;s story · Mindful alignment &amp; spine restoration
      </p>
    </section>
  );
}
