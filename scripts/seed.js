const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding online database for Yoga with Dhaarna...');

  // 1. Seed Admin
  const defaultPasswordHash = await bcrypt.hash('admin_password_123', 10);
  await prisma.admin.upsert({
    where: { email: 'dhaarna@yogawithdhaarna.com' },
    update: {},
    create: {
      email: 'dhaarna@yogawithdhaarna.com',
      passwordHash: defaultPasswordHash,
      name: 'Dhaarna Sharma',
    },
  });
  console.log('✅ Admin account seeded: dhaarna@yogawithdhaarna.com');

  // 2. Seed Settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      instructorName: 'Dhaarna Sharma',
      instagramHandle: '@yogawithdhaarna',
      instagramUrl: 'https://www.instagram.com/yogawithdhaarna',
      notificationEmail: 'dhaarna@yogawithdhaarna.com',
      emailNotifications: true,
      soundAlerts: true,
    },
  });
  console.log('✅ Settings seeded');

  // 3. Seed Yoga Plans
  const plans = [
    {
      title: 'Beginner Foundations & Safe Alignment',
      slug: 'beginner-foundations-safe-alignment',
      description: 'Designed specifically for beginners or those returning to yoga after injury. Build functional strength, learn proper joint alignment, and cultivate breath awareness without fear of straining your lower back.',
      price: 2499,
      priceUsd: 32,
      duration: '4 Weeks (12 Live Sessions)',
      type: 'BATCH',
      level: 'BEGINNER',
      badge: 'MOST POPULAR',
      features: JSON.stringify([
        'Master foundational postures (Tadasana, Bhujangasana, Virabhadrasana)',
        'Gentle spine decompression & wrist/knee injury prevention',
        'Live posture correction & personal Q&A every session',
        'HD recordings + guided practice homework included',
        'No prior flexibility or yoga experience required',
      ]),
      isActive: true,
      isFeatured: true,
    },
    {
      title: '1-on-1 Personal Spine Health & Mobility Coaching',
      slug: '1-on-1-spine-health-mobility',
      description: "Private dedicated coaching tailored to your body's unique anatomy and lifestyle. Ideal for desk workers, individuals managing neck/back stiffness, or those seeking dedicated 1-on-1 attention.",
      price: 4999,
      priceUsd: 65,
      duration: '4 Private Sessions (60 Min each)',
      type: 'PRIVATE',
      level: 'ALL_LEVELS',
      badge: 'LIMITED (4 SPOTS/WEEK)',
      features: JSON.stringify([
        'Comprehensive posture & spinal mobility assessment',
        'Customized sequence for desk slouch, back pain, or stiffness',
        'Direct WhatsApp guidance & daily posture habit tracker',
        'Flexible scheduling according to your timezone',
        'Personalized Pranayama (breathwork) sequence for stress',
      ]),
      isActive: true,
      isFeatured: true,
    },
    {
      title: 'Monthly Morning Flow & Pranayama Pass',
      slug: 'monthly-morning-flow-pranayama',
      description: 'Start each morning grounded, energized, and centered. A balanced rhythm of energizing movement, nervous system regulation, and mindful stillness before your workday begins.',
      price: 3499,
      priceUsd: 45,
      duration: 'Monthly Pass (Mon-Fri 7:00 AM IST)',
      type: 'MEMBERSHIP',
      level: 'ALL_LEVELS',
      badge: 'DAILY RITUAL',
      features: JSON.stringify([
        '20 Live interactive morning classes per month',
        'Dynamic Vinyasa flow + soothing restorative cool-down',
        '15 minutes dedicated conscious breathwork & meditation',
        'Community WhatsApp circle with weekly wellness prompts',
        'Full access to on-demand catch-up recordings',
      ]),
      isActive: true,
      isFeatured: true,
    },
    {
      title: 'Mindful Mini-Retreat & Breathwork Immersion',
      slug: 'mindful-mini-retreat-breathwork',
      description: 'An immersive weekend journey into deep rest, mindfulness, and nervous system regulation. Step away from daily noise to recharge your mind and body.',
      price: 5999,
      priceUsd: 79,
      duration: 'Weekend Intensive (Saturday & Sunday)',
      type: 'WORKSHOP',
      level: 'ALL_LEVELS',
      badge: 'SPECIAL IMMERSION',
      features: JSON.stringify([
        'Deep parasympathetic nervous system reset',
        'Intensive alignment workshop & gentle somatic movement',
        'Guided sound meditation & restorative Yin yoga',
        'Personalized wellness workbook & reflection journal',
        'Small intimate cohort (max 15 participants)',
      ]),
      isActive: true,
      isFeatured: false,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  console.log('✅ Yoga plans seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
