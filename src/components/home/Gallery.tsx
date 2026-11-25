import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { GALLERY } from '@/content/home';

interface GalleryProps {
  instagramUrl: string;
  instagramHandle: string;
}

/** Photo grid; the last tile links to Instagram for more. */
export default function Gallery({ instagramUrl, instagramHandle }: GalleryProps) {
  return (
    <section id="gallery" className="bg-sand py-20 sm:py-28">
      <div className="brand-container">
        <h2 className="sr-only">Photos</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY.map((photo, i) => (
            <figure
              key={photo.src}
              className={`group overflow-hidden rounded-2xl bg-cream ${i === 0 ? 'col-span-2 md:row-span-2' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                  i === 0 ? 'aspect-square md:aspect-auto' : 'aspect-square'
                }`}
              />
            </figure>
          ))}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex aspect-[2/1] flex-col md:col-span-1 md:aspect-square items-center justify-center gap-3 rounded-2xl bg-rose p-6 text-center text-umber transition-colors hover:bg-rose-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          >
            <Instagram className="h-8 w-8" aria-hidden />
            <span className="font-serif text-2xl leading-tight">See more on Instagram</span>
            <span className="inline-flex items-center gap-1 text-sm">
              {instagramHandle}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
