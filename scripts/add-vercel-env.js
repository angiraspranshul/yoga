const { execSync } = require('child_process');

const npx = 'C:\\Program Files\\nodejs\\npx.cmd';
const cwd = 'C:\\Users\\angir\\OneDrive\\Desktop\\Yoga\\yoga-platform';

const dbUrl = 'postgresql://postgres:g8KLbcRDItOLa7vV@db.vytvxjzgrbhokmwtovwl.supabase.co:5432/postgres';
const jwtSecret = 'yoga_with_dhaarna_secure_jwt_secret_key_2026_super_safe';

function addEnv(key, value) {
  try {
    console.log(`Setting ${key} on Vercel...`);
    execSync(`"${npx}" vercel env add ${key} production --force`, {
      input: value + '\n',
      cwd,
      stdio: ['pipe', 'inherit', 'inherit']
    });
    console.log(`✓ ${key} added successfully!`);
  } catch (e) {
    console.log(`Note for ${key}: ${e.message}`);
  }
}

addEnv('DATABASE_URL', dbUrl);
addEnv('DIRECT_URL', dbUrl);
addEnv('JWT_SECRET', jwtSecret);

console.log('All environment variables configured!');
