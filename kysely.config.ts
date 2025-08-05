import { defineConfig } from 'kysely-ctl';
import { db } from './src/db/client';

const config = defineConfig({
  kysely: db,
  migrations: {
    migrationFolder: './src/db/migrations',
  },
  seeds: {
    seedFolder: './src/db/seeds',
  },
});

export default config; 