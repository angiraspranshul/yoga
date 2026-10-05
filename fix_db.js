const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Delete the test plan
  try {
    await prisma.plan.delete({ where: { slug: 'live-db-sync-test' } });
    console.log('Deleted test plan');
  } catch (e) {
    console.log('Test plan not found, skipping');
  }

  // Check if the Mindful Mini-Retreat exists
  const existing = await prisma.plan.findUnique({ where: { slug: 'mindful-mini-retreat-breathwork' } });
  if (!existing) {
    await prisma.plan.create({
      data: {
        title: 'Mindful Mini-Retreat & Breathwork Immersion',
        slug: 'mindful-mini-retreat-breathwork',
        description: 'An immersive weekend journey into deep rest, mindfulness, and nervous system regulation. Step away from daily noise to recharge your mind and body.',
        price: 5999,
        currency: 'INR',
        priceUsd: 79,
        duration: 'Weekend Intensive (Saturday & Sunday)',
        type: 'WORKSHOP',
        level: 'ALL_LEVELS',
        features: JSON.stringify([
          'Deep parasympathetic nervous system reset',
          'Intensive alignment workshop & gentle somatic movement',
          'Guided sound meditation & restorative Yin yoga',
          'Personalized wellness workbook & reflection journal',
          'Small intimate cohort (max 15 participants)',
        ]),
        badge: 'SPECIAL IMMERSION',
        isActive: true,
        isFeatured: false,
      },
    });
    console.log('Re-created Mindful Mini-Retreat plan');
  } else {
    console.log('Mindful Mini-Retreat already exists');
  }

  // Check Corporate plan
  const corp = await prisma.plan.findUnique({ where: { slug: 'corporate-workplace-ergonomics' } });
  if (!corp) {
    await prisma.plan.create({
      data: {
        title: 'Corporate & Workplace Ergonomics Masterclass',
        slug: 'corporate-workplace-ergonomics',
        description: 'Live virtual interactive wellness session for tech teams, remote founders, and design studios. Practical desk yoga, optical rest, and chair alignment techniques.',
        price: 9999,
        currency: 'INR',
        priceUsd: 130,
        duration: 'Single 90-Minute Interactive Workshop',
        type: 'WORKSHOP',
        level: 'ALL_LEVELS',
        features: JSON.stringify([
          'Interactive ergonomics audit for desk workers',
          'Instant neck & upper thoracic release sequences',
          'Breathing techniques to reduce cortisol & midday fatigue',
          'PDF Workplace Ergonomics Pocket Guide for all attendees',
          'Recording license for internal team LMS / onboarding',
        ]),
        badge: 'TEAMS & WORKPLACES',
        isActive: true,
        isFeatured: false,
      },
    });
    console.log('Created Corporate Masterclass plan');
  } else {
    console.log('Corporate Masterclass already exists');
  }

  const all = await prisma.plan.findMany({ select: { id: true, title: true } });
  console.log('\nAll plans in database:');
  all.forEach(p => console.log(`  - ${p.title} (${p.id})`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
