import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'localhost',
    user: 'amberallee',
    password: '1q2w3e4r',
    database: 'amberallee_dev',
    port: 5432
  }
} satisfies Config;