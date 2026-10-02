import React from 'react';
import { getOrders } from '@/lib/db';
import OrdersClient from './OrdersClient';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <OrdersClient initialOrders={orders} />
    </div>
  );
}
