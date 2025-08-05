import { db } from './client';

export class Database {
  async connect(): Promise<void> {
    // Kysely automatycznie zarządza połączeniem
    console.log('✅ Połączono z bazą danych przez Kysely');
  }

  getDb() {
    return db;
  }

  async disconnect(): Promise<void> {
    await db.destroy();
  }
} 