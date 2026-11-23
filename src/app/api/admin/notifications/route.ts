import { NextResponse } from 'next/server';
import { getNotifications, markNotificationRead } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { notificationUpdateSchema, parseJson } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notifications = await getNotifications();
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Failed to get notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = await parseJson(request, notificationUpdateSchema);
    if (parsed.error) return parsed.error;

    const success = await markNotificationRead(parsed.data.id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Failed to mark notification read:', error);
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}
