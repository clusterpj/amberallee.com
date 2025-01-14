import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || 'postgres://amberallee:1q2w3e4r@localhost:5432/amberallee_dev';
const url = new URL(connectionString);

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1)
  }
} satisfies Config;
