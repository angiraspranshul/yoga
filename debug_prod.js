const BASE = 'https://yoga-three-sage.vercel.app';

async function debug() {
  // Login
  const loginRes = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'dhaarna@yogawithdhaarna.com',
      password: 'admin_password_123',
    }),
  });
  const cookie = loginRes.headers.get('set-cookie');
  const tokenMatch = cookie.match(/dhaarna_admin_session=([^;]+)/);
  const authHeader = `dhaarna_admin_session=${tokenMatch[1]}`;

  // Try creating a plan and see the full error
  const createRes = await fetch(`${BASE}/api/plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: authHeader },
    body: JSON.stringify({
      title: 'Debug Test Plan',
      description: 'Testing database connectivity',
      price: 1999,
      duration: 'Test',
      type: 'BATCH',
      level: 'ALL_LEVELS',
      features: ['Feature 1'],
      isActive: true,
      isFeatured: false,
    }),
  });
  const createBody = await createRes.text();
  console.log('Create Status:', createRes.status);
  console.log('Create Response:', createBody);

  // Try fetching plans (GET) to see if reads work
  const getRes = await fetch(`${BASE}/api/plans`);
  const getBody = await getRes.text();
  console.log('\nGET /api/plans Status:', getRes.status);
  console.log('GET Response:', getBody.substring(0, 500));

  // Try the homepage
  const homeRes = await fetch(`${BASE}/`);
  console.log('\nHomepage Status:', homeRes.status);
}

debug().catch(console.error);
