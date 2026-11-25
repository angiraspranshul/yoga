import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/brand/PageHeader';
import VideoStory from '@/components/home/VideoStory';
import Gallery from '@/components/home/Gallery';
import { getPublicSettings } from '@/lib/public-data';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos and video from Dharana classes, retreats and workshops.',
};

export default async function GalleryPage() {
  const settings = await getPublicSettings();

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments from the mat" intro="Photos and video from our classes and practice." />
      <VideoStory />
      <Gallery
        instagramUrl={settings?.instagramUrl || 'https://www.instagram.com/yogawithdhaarna'}
        instagramHandle={settings?.instagramHandle || '@yogawithdhaarna'}
      />
    </>
  );
}
