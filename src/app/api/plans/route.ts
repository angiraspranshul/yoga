import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPlans, createPlan, INR_PER_USD } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { parseJson, planCreateSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

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

    const parsed = await parseJson(request, planCreateSchema);
    if (parsed.error) return parsed.error;
    const input = parsed.data;

    const slug = input.slug || input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPlan = await createPlan({
      ...input,
      slug,
      priceUsd: input.priceUsd ?? Math.round(input.price / INR_PER_USD),
      badge: input.badge ?? null,
      imageUrl: input.imageUrl ?? null,
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'A plan with this title/slug already exists (possibly a deleted plan kept for its bookings). Please use a different title.' },
        { status: 409 }
      );
    }
    console.error('Failed to create plan:', error);
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
  }
}
