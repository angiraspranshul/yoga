import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPlanById, updatePlan, deletePlan } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const plan = await getPlanById(params.id);
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }
    return NextResponse.json(plan);
  } catch (error) {
    console.error('Failed to get plan:', error);
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await updatePlan(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    revalidatePath(`/checkout/${params.id}`, 'page');
    revalidatePath('/checkout/[planId]', 'page');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update plan:', error);
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const success = await deletePlan(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Plan not found or could not be deleted' }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    revalidatePath(`/checkout/${params.id}`, 'page');
    revalidatePath('/checkout/[planId]', 'page');

    return NextResponse.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Failed to delete plan:', error);
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
  }
}
