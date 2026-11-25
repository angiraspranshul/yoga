import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/brand/PageHeader';
import NextStep from '@/components/brand/NextStep';
import Workshops from '@/components/home/Workshops';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Short, focused yoga workshops on breath, spine care and meditation.',
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Upcoming workshops"
        title="Learn one thing well"
        intro="Short, focused sessions on a single theme. Open to everyone, including complete beginners."
      />
      <Workshops />
      <NextStep />
    </>
  );
}
