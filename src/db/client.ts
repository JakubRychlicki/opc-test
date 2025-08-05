import { Kysely, MssqlDialect } from 'kysely';
import * as tarn from 'tarn';
import * as tedious from 'tedious';
import { config } from '../config';
import { DB } from '../db/types';

const dialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      min: 0,
      max: 10,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () => new tedious.Connection(config.dbOptions),
  },
});

export const db = new Kysely<DB>({
  dialect,
}); 