'use client';

import React from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { Settings } from '@/types';

interface ReadyToBeginBannerProps {
  settings?: Settings | null;
}

export default function ReadyToBeginBanner({ settings }: ReadyToBeginBannerProps) {
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna';
  const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';

  return (
    <section className="bg-sage py-20 sm:py-28 px-6 text-cream">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-cream font-normal">
          Ready to begin?
        </h2>
        <p className="mx-auto max-w-lg text-sm sm:text-base text-cream/85 font-light font-sans leading-relaxed">
          Your first session is a conversation, not a commitment. Zero flexibility required.
          Come as you are.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#classes"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-cream hover:bg-gold text-olive font-medium px-9 py-4 text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-black/10"
          >
            <span>Book your session</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-cream/15 hover:bg-cream/25 text-cream border border-cream/20 backdrop-blur-md px-7 py-4 text-sm font-medium transition-all"
          >
            <Instagram className="w-4 h-4 text-gold" />
            <span>Connect on Instagram ({instagramHandle})</span>
          </a>
        </div>
      </div>
    </section>
  );
}
