import React from 'react';
import Hero from '@/components/home/Hero';
import AboutIntro from '@/components/home/AboutIntro';
import VideoStory from '@/components/home/VideoStory';
import ServiceCards from '@/components/home/ServiceCards';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Testimonials from '@/components/home/Testimonials';
import NextStep from '@/components/brand/NextStep';
import { getPublicPlans } from '@/lib/public-data';

export default async function HomePage() {
  const plans = await getPublicPlans();

  return (
    <>
      <Hero />
      <AboutIntro showMoreLink />
      <VideoStory />
      <ServiceCards />
      <FeaturedPrograms plans={plans} />
      <Testimonials />
      <NextStep />
    </>
  );
}
