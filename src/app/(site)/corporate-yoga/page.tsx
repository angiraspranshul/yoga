import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/brand/PageHeader';
import NextStep from '@/components/brand/NextStep';
import Corporate from '@/components/home/Corporate';

export const metadata: Metadata = {
  title: 'Corporate Yoga',
  description: 'Yoga and breathwork for teams, online or at your office.',
};

export default function CorporateYogaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate yoga"
        title="Wellness for working teams"
        intro="Practical yoga and breathwork that fits into the working day, for teams of any size."
      />
      <Corporate />
      <NextStep
        title="Plan a session for your team"
        text="Tell us your team size, location and goals, and we will suggest a format that suits you."
      />
    </>
  );
}
