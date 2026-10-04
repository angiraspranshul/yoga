import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/midground/HeroSection';
import ThePracticeSection from '@/components/midground/ThePracticeSection';
import VideoStorySection from '@/components/midground/VideoStorySection';
import SessionJourneySection from '@/components/midground/SessionJourneySection';
import MomentsGallery from '@/components/midground/MomentsGallery';
import ReadyToBeginBanner from '@/components/midground/ReadyToBeginBanner';
import PlanGrid from '@/components/PlanGrid';
import FaqSection from '@/components/FaqSection';
import { getPlans, getSettings } from '@/lib/db';

export const revalidate = 0;

export default async function HomePage() {
  const [plans, settings] = await Promise.all([
    getPlans(false),
    getSettings(),
  ]);

  return (
    <main className="min-h-screen bg-cream text-olive selection:bg-sage selection:text-cream">
      {/* 1. ELEGANT SERIF & GLASS NAVBAR */}
      <Navbar settings={settings} />

      {/* 2. SERENE MOUNTAIN HERO: "Find stillness. Move with breath." */}
      <HeroSection />

      {/* 3. THE PRACTICE: "Yoga is not a workout. It is a work-in." */}
      <ThePracticeSection />

      {/* 4. WATCH DHAARNA'S STORY: AMBIENT VIDEO FEATURE */}
      <VideoStorySection />

      {/* 5. A SESSION WITH DHAARNA: "The journey of one hour" (4-STEP STEPPER) */}
      <SessionJourneySection />

      {/* 6. CLASSES & OFFERINGS (CONNECTED TO DATABASE) */}
      <section id="classes" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 border-t border-cream-dark/60 bg-cream">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-sage">
              Classes &amp; Cohorts
            </p>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-olive">
              Choose your practice
            </h2>
          </div>

          <PlanGrid initialPlans={plans} />
        </div>
      </section>

      {/* 7. MOMENTS FROM THE MAT (PHOTO CAROUSEL) */}
      <MomentsGallery settings={settings} />

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 border-t border-cream-dark/60 bg-cream">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-sans font-medium uppercase tracking-[0.25em] text-sage">
              Questions &amp; Guidance
            </p>
            <h2 className="font-serif italic text-3xl sm:text-5xl text-olive">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-olive/60 font-light font-sans">
              Everything you need to know about practicing with {settings?.instructorName || 'Dhaarna Sharma'}.
            </p>
          </div>

          <FaqSection settings={settings} />
        </div>
      </section>

      {/* 9. READY TO BEGIN? SAGE GREEN CALLOUT BANNER */}
      <ReadyToBeginBanner settings={settings} />

      {/* 10. DEEP OLIVE ORGANIC FOOTER */}
      <Footer settings={settings} />
    </main>
  );
}
