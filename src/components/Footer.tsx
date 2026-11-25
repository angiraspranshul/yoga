import React from 'react';
import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { Settings } from '@/types';
import BrandLogo from '@/components/brand/BrandLogo';
import { NAV_LINKS, SERVICES } from '@/content/home';

interface FooterProps {
  settings?: Settings | null;
}

export default function Footer({ settings }: FooterProps) {
  const instructorName = settings?.instructorName || 'Dhaarna Sharma';
  const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna';
  const email = settings?.notificationEmail;

  return (
    <footer className="bg-rose text-umber">
      <div className="brand-container grid gap-12 py-16 sm:py-20 md:grid-cols-12">
        <div className="space-y-6 md:col-span-5">
          <BrandLogo variant="lockup" className="w-[200px]" />
          <p className="max-w-sm font-light leading-relaxed">
            A yoga academy for a steady body and a focused mind, guided by {instructorName}.
          </p>
          <Link href="/#services" className="btn-primary">
            Explore what we offer
          </Link>
        </div>

        <div className="space-y-4 md:col-span-3">
          <h2 className="brand-eyebrow text-umber">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
            {NAV_LINKS.filter((l) => l.label !== 'Contact').map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-light hover:underline hover:underline-offset-4">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:col-span-4">
          <h2 className="brand-eyebrow text-umber">Contact</h2>
          <ul className="space-y-3 font-light">
            {email && (
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden />
                <a href={`mailto:${email}`} className="break-all hover:underline hover:underline-offset-4">
                  {email}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <Instagram className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                {instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden />
              <span>Online classes worldwide · Himachal Pradesh, India</span>
            </li>
          </ul>
          <p className="pt-2 text-sm font-light text-umber">
            Offerings: {SERVICES.map((s) => s.title).join(' · ')}
          </p>
        </div>
      </div>

      <div className="border-t border-umber/15">
        <div className="brand-container flex flex-col gap-3 py-6 text-sm font-light text-umber sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dharana Yoga Academy. All rights reserved.</p>
          <Link href="/admin" prefetch={false} className="hover:underline hover:underline-offset-4">
            Instructor login
          </Link>
        </div>
      </div>
    </footer>
  );
}
