import React from 'react';
import { getSettings } from '@/lib/db';
import { requireAdminPage } from '@/lib/auth';
import SettingsClient from './SettingsClient';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  await requireAdminPage();
  const settings = await getSettings();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <SettingsClient initialSettings={settings} />
    </div>
  );
}
