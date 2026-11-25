import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost, Space_Grotesk } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Kept for the admin screens, which use it for labels and figures.
const mono = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://yoga-three-sage.vercel.app'),
  title: {
    default: 'Dharana Yoga Academy | Yoga, Retreats, Workshops & Corporate Wellness',
    template: '%s | Dharana Yoga Academy',
  },
  description:
    'Dharana (धारणा) is a yoga academy for steady practice and a focused mind: yoga programs, retreats, workshops and corporate wellness, guided with care.',
  keywords: [
    'Dharana yoga',
    'Dharana Yoga Academy',
    'online yoga classes India',
    'yoga retreats',
    'yoga workshops',
    'corporate yoga',
    'meditation and pranayama',
  ],
  openGraph: {
    title: 'Dharana Yoga Academy',
    description: 'Yoga programs, retreats, workshops and corporate wellness, guided with care.',
    siteName: 'Dharana Yoga Academy',
    type: 'website',
    images: [{ url: '/brand/dharana-logo.jpg', width: 1050, height: 600, alt: 'Dharana logo' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${heading.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-cream text-umber font-sans min-h-screen selection:bg-blush selection:text-umber antialiased">
        {children}
      </body>
    </html>
  );
}
