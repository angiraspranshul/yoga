import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/brand/PageHeader';
import NextStep from '@/components/brand/NextStep';
import Retreats from '@/components/home/Retreats';

export const metadata: Metadata = {
  title: 'Retreats',
  description: 'Small-group yoga retreats with daily practice, meditation, rest and good food.',
};

export default function RetreatsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Retreats"
        title="Time away to go deeper"
        intro="Small-group retreats with daily practice, meditation, rest and good food, away from screens and schedules."
      />
      <Retreats />
      <NextStep
        title="Want to hear about the next retreat?"
        text="Places are limited to keep groups small. Write to us and we will share dates and details as soon as they are confirmed."
      />
    </>
  );
}
