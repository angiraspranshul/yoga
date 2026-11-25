import { revalidateTag, unstable_cache } from 'next/cache';
import { getPlans, getSettings } from '@/lib/db';
import { Plan, Settings } from '@/types';

/**
 * Cached reads for the public website, so pages don't wait on the database
 * for every visitor. Admin changes refresh the cache immediately through
 * `refreshPublicData()`; the time limit below is only a safety net.
 * The admin dashboard keeps reading live data from `@/lib/db`.
 */
const REVALIDATE_SECONDS = 300;

const cachedPlans = unstable_cache(() => getPlans(false), ['public-plans'], {
  tags: ['plans'],
  revalidate: REVALIDATE_SECONDS,
});

const cachedSettings = unstable_cache(() => getSettings(), ['public-settings'], {
  tags: ['settings'],
  revalidate: REVALIDATE_SECONDS,
});

/** Active plans for the public site; an empty list if the database is unreachable. */
export async function getPublicPlans(): Promise<Plan[]> {
  try {
    return await cachedPlans();
  } catch (err) {
    console.error('[public-data] plans unavailable', err instanceof Error ? err.message : err);
    return [];
  }
}

/** Instructor and contact settings; null if the database is unreachable. */
export async function getPublicSettings(): Promise<Settings | null> {
  try {
    return await cachedSettings();
  } catch (err) {
    console.error('[public-data] settings unavailable', err instanceof Error ? err.message : err);
    return null;
  }
}

/** Call after an admin changes plans or settings so the public pages update at once. */
export function refreshPublicData(what: 'plans' | 'settings') {
  try {
    revalidateTag(what);
  } catch (err) {
    console.error('[public-data] revalidate failed', err instanceof Error ? err.message : err);
  }
}
