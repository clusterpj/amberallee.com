// src/lib/db/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment');
  }

  const connection = postgres(process.env.DATABASE_URL, { 
    max: 1,
    timeout: 30, // 30 seconds connection timeout
    connect_timeout: 10 // 10 seconds initial connection timeout
  });
  const db = drizzle(connection);

  console.log('🚀 Starting database migrations...');
  console.log(`📂 Migration folder: drizzle`);
  
  const start = Date.now();
  
  try {
    await migrate(db, { migrationsFolder: 'drizzle' });
    const end = Date.now();

    console.log(`✅ Migrations completed successfully in ${end - start}ms`);
  } catch (err) {
    console.error('❌ Migration failed with error:', err);
    throw err;
  } finally {
    await connection.end(); // Ensure connection is closed
  }
};

runMigrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('🛑 Fatal migration error:', err);
    process.exit(1);
  });
