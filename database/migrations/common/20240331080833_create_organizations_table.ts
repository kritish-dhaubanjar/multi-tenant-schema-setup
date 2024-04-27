import type { Knex } from 'knex'

import env from '../../../env'

const schema = env.DB_MIGRATION_SCHEMA_NAME

export async function up(knex: Knex): Promise<void> {
  return knex.schema.withSchema(schema).createTable('organizations', (table) => {
    table.increments('id')
    table.string('org_id').primary()
    table.string('name')
    table.string('type')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.withSchema(schema).dropTable('organizations')
}
