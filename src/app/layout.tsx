import type { Metadata } from 'next';
import './globals.css';
import YogaChatbot from '@/components/chat/YogaChatbot';

export const metadata: Metadata = {
  title: 'Yoga with Dhaarna (@yogawithdhaarna) | Mindful Movement & Alignment',
  description:
    'Experience mindful movement, spine decompression, and conscious breathwork with Dhaarna Sharma (@yogawithdhaarna). Explore 1-on-1 coaching, monthly online batches, and beginner foundations.',
  keywords: [
    'Yoga with Dhaarna',
    'Dhaarna Sharma yoga',
    'online yoga batch India',
    'spine health yoga coaching',
    'mindful breathwork classes',
    'beginner yoga alignment',
  ],
  openGraph: {
    title: 'Yoga with Dhaarna | Mindful Movement & Safe Alignment',
    description: 'Flexibility is not a prerequisite to start yoga. Build strength, find calm, and breathe deeply.',
    url: 'https://www.instagram.com/yogawithdhaarna',
    siteName: 'Yoga with Dhaarna',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-olive min-h-screen selection:bg-sage selection:text-cream antialiased">
        {children}
        <YogaChatbot />
      </body>
    </html>
  );
}
