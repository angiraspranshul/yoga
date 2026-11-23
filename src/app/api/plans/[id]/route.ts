import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getBookablePlanById, updatePlan, deletePlan } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { parseJson, planUpdateSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Public: only plans that are visible on the website.
    const plan = await getBookablePlanById(params.id);
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

    const parsed = await parseJson(request, planUpdateSchema);
    if (parsed.error) return parsed.error;

    const updated = await updatePlan(params.id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json(updated);
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Another plan already uses this slug.' }, { status: 409 });
    }
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

    const result = await deletePlan(params.id);
    if (result === 'not_found') {
      return NextResponse.json({ error: 'Plan not found or could not be deleted' }, { status: 404 });
    }

    revalidatePath('/', 'layout');

    return NextResponse.json({
      success: true,
      result,
      message:
        result === 'archived'
          ? 'Plan removed from the website. It has bookings, so it was archived to keep their history.'
          : 'Plan deleted successfully.',
    });
  } catch (error) {
    console.error('Failed to delete plan:', error);
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
  }
}
