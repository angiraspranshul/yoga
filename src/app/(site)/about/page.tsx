import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/brand/PageHeader';
import NextStep from '@/components/brand/NextStep';
import AboutIntro from '@/components/home/AboutIntro';
import Instructor from '@/components/home/Instructor';
import Philosophy from '@/components/home/Philosophy';
import { getPublicSettings } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'About',
  description: 'The meaning of Dharana, our instructor, and the philosophy behind every class.',
};

export default async function AboutPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Dharana"
        intro="Who we are, who teaches, and the idea our classes are built on."
      />
      <AboutIntro />
      <Instructor
        name={settings?.instructorName || 'Dhaarna Sharma'}
        instagramUrl={settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna'}
        instagramHandle={settings?.instagramHandle || '@yogawithdhaarna'}
      />
      <Philosophy />
      <NextStep />
    </>
  );
}
