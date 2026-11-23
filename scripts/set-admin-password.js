// Creates or resets the single admin account (bcrypt hash stored in the Admin table).
// Usage:  node scripts/set-admin-password.js
// Uses DATABASE_URL from .env (loaded by Prisma). Prompts for everything; nothing is
// passed on the command line, so the password never lands in shell history.
//
// Any OTHER admin rows are removed, including the old seeded default account,
// so only the account you set here can log in.

const readline = require('readline');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (str) => {
        if (str.includes(question)) rl.output.write(str);
        else if (str === '\r\n' || str === '\n') rl.output.write(str);
        else rl.output.write('*');
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write('\n');
      resolve(answer);
    });
  });
}

async function main() {
  const prisma = new PrismaClient();
  try {
    const email = (await ask('Admin email: ')).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('That does not look like a valid email.');

    const name = (await ask('Display name [Dhaarna Sharma]: ')).trim() || 'Dhaarna Sharma';

    const password = await ask('New password (min 14 chars): ', { hidden: true });
    if (password.length < 14) throw new Error('Password must be at least 14 characters.');
    const confirm = await ask('Repeat password: ', { hidden: true });
    if (password !== confirm) throw new Error('Passwords do not match.');

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.admin.upsert({
      where: { email },
      update: { passwordHash, name },
      create: { email, passwordHash, name },
    });

    const removed = await prisma.admin.deleteMany({ where: { email: { not: email } } });

    console.log(`\n✅ Admin password set for ${email}.`);
    console.log(`   Removed ${removed.count} other admin account(s).`);
    console.log('   Note: existing sessions stay valid until JWT_SECRET is rotated.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(`\n❌ ${err.message || err}`);
  process.exit(1);
});
