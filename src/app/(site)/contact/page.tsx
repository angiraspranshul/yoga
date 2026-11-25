import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CalendarCheck, Instagram, Mail, MapPin } from 'lucide-react';
import PageHeader from '@/components/brand/PageHeader';
import SectionHeading from '@/components/brand/SectionHeading';
import FaqSection from '@/components/FaqSection';
import { getPublicSettings } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Dharana Yoga Academy about classes, retreats, workshops or corporate yoga.',
};

export default async function ContactPage() {
  const settings = await getPublicSettings();
  const email = settings?.notificationEmail;
  const instagramHandle = settings?.instagramHandle || '@yogawithdhaarna';
  const instagramUrl = settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna';

  const cards = [
    email && {
      icon: Mail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      note: 'For questions about classes, retreats, workshops and corporate sessions.',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: instagramHandle,
      href: instagramUrl,
      note: 'Send a message or follow for class updates.',
      external: true,
    },
    {
      icon: CalendarCheck,
      label: 'Book',
      value: 'Explore what we offer',
      href: '/#services',
      note: 'Yoga programs, retreats, workshops and corporate yoga, each with its own booking details.',
    },
    {
      icon: MapPin,
      label: 'Where',
      value: 'Online, worldwide',
      note: 'Rooted in Himachal Pradesh, India.',
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
    note: string;
    external?: boolean;
  }[];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We’d love to hear from you"
        intro="Questions about a class, a retreat or a session for your team? Reach out and we will reply personally."
      />

      <section className="bg-cream py-16 sm:py-20">
        <div className="brand-container grid gap-5 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            const body = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush-light text-clay">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="brand-eyebrow text-clay">{card.label}</p>
                  <p className="break-words font-serif text-xl text-umber [overflow-wrap:anywhere] sm:text-2xl">{card.value}</p>
                  <p className="font-light text-umber-muted">{card.note}</p>
                </div>
              </>
            );
            const cls = 'flex min-w-0 items-start gap-5 rounded-2xl border border-line bg-white/70 p-6 sm:p-7';
            const linkCls = `${cls} transition-colors duration-150 hover:border-rose hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay`;
            if (card.href?.startsWith('/')) {
              return (
                <Link key={card.label} href={card.href} className={linkCls}>
                  {body}
                </Link>
              );
            }
            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={linkCls}
              >
                {body}
              </a>
            ) : (
              <div key={card.label} className={cls}>
                {body}
              </div>
            );
          })}
        </div>
      </section>

      <section id="faq" className="bg-sand py-20 sm:py-28">
        <div className="brand-container space-y-12">
          <SectionHeading eyebrow="FAQs" title="Questions, answered" />
          <FaqSection />
        </div>
      </section>
    </>
  );
}
