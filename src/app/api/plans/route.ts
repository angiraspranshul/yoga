import { NextResponse } from 'next/server';
import { getPlans, createPlan } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('all') === 'true';

    // If requesting all, verify admin session
    if (includeInactive) {
      const session = await getAdminSession();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const plans = await getPlans(includeInactive);
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Failed to get plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, price, duration, type, level, features, badge, imageUrl, isFeatured } = body;

    if (!title || !description || !price || !duration) {
      return NextResponse.json({ error: 'Missing required plan fields' }, { status: 400 });
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPlan = await createPlan({
      title,
      slug,
      description,
      price: Number(price),
      currency: body.currency || 'INR',
      priceUsd: body.priceUsd ? Number(body.priceUsd) : Math.round(Number(price) / 75),
      duration,
      type: type || 'BATCH',
      level: level || 'ALL_LEVELS',
      features: Array.isArray(features) ? features : (features ? [features] : []),
      badge: badge || null,
      imageUrl: imageUrl || null,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : false,
    });

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    console.error('Failed to create plan:', error);
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
