import type { Knex } from 'knex'

import { DB_SCHEMAS } from '../../../../constants/database/schemas.constant'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createSchemaIfNotExists(DB_SCHEMAS.TX)
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropSchemaIfExists(DB_SCHEMAS.TX)
}
