import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSettings, updateSettings } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { parseJson, settingsUpdateSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = await parseJson(request, settingsUpdateSchema);
    if (parsed.error) return parsed.error;
    const updated = await updateSettings(parsed.data);

    revalidatePath('/', 'layout');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
