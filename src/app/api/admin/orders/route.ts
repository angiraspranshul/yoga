import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getOrders, updateOrder } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { orderUpdateSchema, parseJson } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Failed to get orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const parsed = await parseJson(request, orderUpdateSchema);
    if (parsed.error) return parsed.error;
    const { orderId, status, paymentStatus } = parsed.data;

    const updated = await updateOrder(orderId, { status, paymentStatus });
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    revalidatePath('/admin/orders', 'page');
    revalidatePath('/admin', 'page');

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
