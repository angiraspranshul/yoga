import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPublicSettings } from '@/lib/public-data';

// Pages are cached and refreshed when the admin changes plans or settings.
export const revalidate = 300;

/** Shared header and footer for the public pages of the site. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getPublicSettings();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
