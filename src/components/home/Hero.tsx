import React from 'react';
import BrandLogo from '@/components/brand/BrandLogo';
import OfferingLinks from '@/components/brand/OfferingLinks';

/**
 * Sized so the logo, headline and the four offerings fit in the first screen
 * on laptops and phones: the logo scales with the screen height.
 */
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-rose">
      <div className="brand-container flex flex-col items-center pb-10 pt-4 text-center sm:pb-14 sm:pt-6">
        {/* Same original artwork, framed on the lettering, lotus and tagline. */}
        <BrandLogo
          variant="lockup"
          priority
          className="w-[clamp(200px,46vh,460px)] max-w-full animate-fade-up"
        />

        <div className="mt-3 w-full max-w-3xl space-y-4 sm:mt-4 sm:space-y-5">
          <h1 className="mx-auto max-w-2xl font-serif text-[2.1rem] font-medium leading-[1.08] text-umber [text-wrap:balance] sm:text-5xl lg:text-[3.4rem]">
            Yoga for a steady body and a focused mind
          </h1>
          <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-umber sm:text-lg">
            Live yoga programs, retreats, workshops and corporate wellness, taught slowly and with care. No flexibility
            needed. Come as you are.
          </p>

          <div className="space-y-3 pt-1">
            <p className="brand-eyebrow text-umber">Explore what we offer</p>
            <OfferingLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
