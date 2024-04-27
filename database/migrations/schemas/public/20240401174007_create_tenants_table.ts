import type { Knex } from 'knex'
import { DB_SCHEMAS } from '../../../../constants/database/schemas.constant'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema(DB_SCHEMAS.public).createTable('tenants', (table) => {
    table.increments('id')
    table.string('tenant_id').primary()
    table.string('schema')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema(DB_SCHEMAS.public).dropTable('tenants')
}
