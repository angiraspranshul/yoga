'use client';

import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

const MOMENTS = [
  {
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    title: 'Warrior Alignment & Grace',
    tag: '@yogawithdhaarna',
  },
  {
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    title: 'Sunrise Breathwork & Centering',
    tag: '@yogawithdhaarna',
  },
  {
    img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    title: 'Cervical & Thoracic Release',
    tag: '@yogawithdhaarna',
  },
  {
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    title: 'Grounded Pelvic Stability',
    tag: '@yogawithdhaarna',
  },
  {
    img: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80',
    title: 'Evening Restorative Stillness',
    tag: '@yogawithdhaarna',
  },
];

export default function MomentsGallery() {
  return (
    <section id="moments" className="py-20 sm:py-28 bg-cream border-t border-cream-dark/60">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-sage">
          Moments
        </p>
        <h2 className="mt-4 font-serif italic text-3xl sm:text-5xl text-olive">
          From the mat
        </h2>
        <p className="mt-3 text-sm text-olive/60 font-light max-w-md mx-auto">
          Snapshots of mindful daily practice, alignment adjustments, and stillness from Himachal Pradesh.
        </p>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 pt-2 no-scrollbar snap-x snap-mandatory max-w-7xl mx-auto">
        {MOMENTS.map((m, idx) => (
          <a
            key={idx}
            href="https://www.instagram.com/yogawithdhaarna"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-64 sm:w-72 md:w-80 flex-none snap-center overflow-hidden rounded-[1.75rem] shadow-sm shadow-olive/5 border border-cream-dark/60 transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={m.img}
              alt={m.title}
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Ambient Gradient Overlay on hover */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-olive/80 via-olive/20 to-transparent p-6 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-serif italic font-normal text-cream">{m.title}</span>
              <span className="flex items-center gap-1 text-xs text-gold mt-1 font-sans">
                <Instagram className="w-3.5 h-3.5" />
                <span>{m.tag}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href="https://www.instagram.com/yogawithdhaarna"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-sage hover:text-sage-dark transition-colors"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow @yogawithdhaarna on Instagram</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
