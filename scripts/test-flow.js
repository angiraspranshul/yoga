const http = require('http');

async function main() {
  console.log('🧪 Starting End-to-End Verification for Yoga with Dhaarna Platform...\n');

  const BASE_URL = 'http://localhost:3000';

  // Helper fetch function
  const apiCall = async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await res.json().catch(() => null);
    return { status: res.status, headers: res.headers, data };
  };

  // 1. Fetch public plans
  console.log('1️⃣ Testing Public Plans API (/api/plans)...');
  const plansRes = await apiCall('/api/plans');
  if (plansRes.status !== 200 || !Array.isArray(plansRes.data)) {
    throw new Error(`Failed to fetch plans: ${JSON.stringify(plansRes.data)}`);
  }
  console.log(`✅ Retrieved ${plansRes.data.length} active yoga offerings:`);
  plansRes.data.forEach((p) => console.log(`   - [${p.type}] ${p.title} (₹${p.price})`));

  const targetPlan = plansRes.data[0];

  // 2. Submit student booking with health intake
  console.log(`\n2️⃣ Testing Student Booking & Intake Checkout for "${targetPlan.title}"...`);
  const bookingPayload = {
    planId: targetPlan.id,
    fullName: 'Kavita Nair',
    email: 'kavita.nair@example.com',
    phone: '+91 98200 11223',
    experienceLevel: 'Beginner (New to Yoga)',
    healthNotes: 'Cervical neck stiffness and mild lumbar fatigue from 10hr desk job.',
    preferredSlot: 'Morning 7:00 AM IST',
    clientMessage: 'Looking forward to learning safe alignment and breathwork!',
    paymentMethod: 'DEMO_CHECKOUT',
  };

  const checkoutRes = await apiCall('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingPayload),
  });

  if (checkoutRes.status !== 200 || !checkoutRes.data.success) {
    throw new Error(`Checkout failed: ${JSON.stringify(checkoutRes.data)}`);
  }
  console.log('✅ Checkout Successful!');
  console.log(`   - Booking Reference: ${checkoutRes.data.bookingId}`);
  console.log(`   - Student Enrolled:  ${checkoutRes.data.client.fullName}`);
  console.log(`   - Notification Sent: "${checkoutRes.data.notification.title}"`);

  // 3. Admin Login
  console.log('\n3️⃣ Testing Admin Authentication (/api/auth/login)...');
  const loginRes = await apiCall('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dhaarna@yogawithdhaarna.com',
      password: 'admin_password_123',
    }),
  });

  if (loginRes.status !== 200 || !loginRes.data.success) {
    throw new Error(`Admin login failed: ${JSON.stringify(loginRes.data)}`);
  }
  console.log('✅ Admin authenticated successfully as Dhaarna Sharma.');

  // Extract session cookie
  const cookieHeader = loginRes.headers.get('set-cookie');
  const sessionCookie = cookieHeader ? cookieHeader.split(';')[0] : '';

  // 4. Admin Orders verification
  console.log('\n4️⃣ Verifying Order & Intake inside Admin Portal (/api/admin/orders)...');
  const ordersRes = await apiCall('/api/admin/orders', {
    headers: { Cookie: sessionCookie },
  });

  if (ordersRes.status !== 200 || !Array.isArray(ordersRes.data)) {
    throw new Error(`Failed to fetch admin orders: ${JSON.stringify(ordersRes.data)}`);
  }
  const foundOrder = ordersRes.data.find((o) => o.client?.email === 'kavita.nair@example.com');
  if (!foundOrder) {
    throw new Error('New student order was not found in admin orders list!');
  }
  console.log('✅ Order verified in Admin Portal:');
  console.log(`   - Student:      ${foundOrder.client.fullName}`);
  console.log(`   - Health Notes: "${foundOrder.healthNotes}"`);
  console.log(`   - Slot:         ${foundOrder.preferredSlot}`);
  console.log(`   - Status:       ${foundOrder.status}`);

  // 5. Admin Notifications verification
  console.log('\n5️⃣ Verifying Live Notification Bell Alert (/api/admin/notifications)...');
  const notifRes = await apiCall('/api/admin/notifications', {
    headers: { Cookie: sessionCookie },
  });

  if (notifRes.status !== 200 || !Array.isArray(notifRes.data)) {
    throw new Error(`Failed to fetch notifications: ${JSON.stringify(notifRes.data)}`);
  }
  const unreadAlerts = notifRes.data.filter((n) => !n.isRead);
  console.log(`✅ Live notifications retrieved. Total unread alerts: ${unreadAlerts.length}`);
  console.log(`   - Latest Alert: "${notifRes.data[0].title}" - ${notifRes.data[0].message}`);

  // 6. Admin Plan Creation
  console.log('\n6️⃣ Testing Admin Plan Creation (/api/plans)...');
  const newPlanPayload = {
    title: 'Sunset Alignment & Yin Immersion',
    description: 'A deep restorative evening practice to release workday tension and prepare for restorative sleep.',
    price: 1999,
    priceUsd: 25,
    duration: '2 Weeks (6 Live Sessions)',
    type: 'WORKSHOP',
    level: 'ALL_LEVELS',
    badge: 'EVENING RITUAL',
    features: [
      'Gentle joint decompression & hip mobility',
      'Guided Yoga Nidra for restorative sleep',
      'Personal posture Q&A with Dhaarna',
    ],
    isActive: true,
    isFeatured: false,
  };

  const createPlanRes = await apiCall('/api/plans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: sessionCookie,
    },
    body: JSON.stringify(newPlanPayload),
  });

  if (createPlanRes.status !== 201 || !createPlanRes.data.id) {
    throw new Error(`Failed to create plan: ${JSON.stringify(createPlanRes.data)}`);
  }
  console.log(`✅ New Plan Created Successfully: "${createPlanRes.data.title}" (ID: ${createPlanRes.data.id})`);

  console.log('\n🎉 ALL END-TO-END VERIFICATION CHECKS PASSED PERFECTLY!\n');
}

main().catch((err) => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});
