import React from 'react';

/**
 * The client's original logo artwork (public/brand/dharana-logo.jpg, 1050×600).
 * The file is used exactly as supplied: it is never redrawn, recoloured or re-saved.
 *
 * - "full"   shows the whole artwork at its own 7:4 aspect ratio.
 * - "lockup" shows a window onto the same file around the lettering, lotus and
 *   tagline (source pixels 320–790 × 205–465), so it can sit in the header.
 *   It must be placed on the `rose` background, which matches the artwork.
 *
 * Replace with a transparent PNG/SVG from the client when available.
 */
export const LOGO_SRC = '/brand/dharana-logo.jpg';
const SRC_W = 1050;
const SRC_H = 600;
const CROP = { x: 320, y: 205, w: 470, h: 260 };

interface BrandLogoProps {
  variant?: 'full' | 'lockup';
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({ variant = 'full', className = '', priority = false }: BrandLogoProps) {
  const alt = 'Dharana (धारणा) logo with lotus and the tagline धारणा ध्यान समाधिश्च';

  if (variant === 'full') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={LOGO_SRC}
        alt={alt}
        width={SRC_W}
        height={SRC_H}
        className={`h-auto w-full ${className}`}
        fetchPriority={priority ? 'high' : undefined}
      />
    );
  }

  return (
    <span
      className={`logo-fade-rect relative block overflow-hidden ${className}`}
      style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt={alt}
        width={SRC_W}
        height={SRC_H}
        className="absolute max-w-none"
        style={{
          width: `${(SRC_W / CROP.w) * 100}%`,
          height: 'auto',
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
        }}
        fetchPriority={priority ? 'high' : undefined}
      />
    </span>
  );
}
