import React from 'react';
import { Instagram, Shield, ArrowUpRight } from 'lucide-react';
import { Settings } from '@/types';

interface FooterProps {
  settings?: Settings | null;
}

export default function Footer({ settings }: FooterProps) {
  const instructorName = settings?.instructorName || 'Dhaarna Sharma';
  const firstName = instructorName.split(' ')[0] || 'Dhaarna';
  const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna';
  const notificationEmail = settings?.notificationEmail || 'dhaarna@yogawithdhaarna.com';

  return (
    <footer className="bg-olive text-cream/80 pt-16 pb-12 border-t border-olive-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif italic text-2xl text-cream font-normal">
              Yoga with {firstName}
            </h3>
            <p className="text-xs sm:text-sm text-cream/70 max-w-md leading-relaxed font-light font-sans">
              Find stillness. Move with breath. Intimate live cohorts and 1-on-1 personal mentorship
              guided by RYT-500 Master Teacher {instructorName} in Himachal Pradesh.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-cream bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-gold" />
                <span>{instagramHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-cream/50" />
              </a>
              <span className="text-xs text-cream/50">RYT-500 Certified Master Instructor</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-medium uppercase tracking-widest text-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li>
                <a href="#practice" className="hover:text-cream transition-colors">
                  The Practice
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-cream transition-colors">
                  The Journey of One Hour
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-cream transition-colors">
                  Classes &amp; Offerings
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-cream transition-colors">
                  Moments from the Mat
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cream transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Instructor & Portal Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-medium uppercase tracking-widest text-gold">
              Instructor Desk
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              <li>
                <a href="/admin" className="hover:text-cream transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-gold" />
                  <span>Instructor Admin Portal</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${notificationEmail}`} className="hover:text-cream transition-colors">
                  {notificationEmail}
                </a>
              </li>
              <li>
                <span className="text-cream/50 text-xs">
                  Dharamshala, Himachal Pradesh, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 gap-4 font-light">
          <p>© {new Date().getFullYear()} Yoga with {firstName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Rooted in mindfulness &amp; classical Hatha tradition</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
