import { Knex } from 'knex'
import { DB_SCHEMAS } from '../../../constants/database/schemas.constant'

export async function seed(knex: Knex): Promise<void> {
  await knex.withSchema(DB_SCHEMAS.public).table('tenants').del()

  await knex
    .withSchema(DB_SCHEMAS.public)
    .table('tenants')
    .insert([
      { id: 1, tenantId: '01HTENHB3RAPRZJX8BH3KQPWFP', schema: 'tx' },
      { id: 2, tenantId: '01HTENHB3RZ8DQ5977P3TQFY7K', schema: 'vt' },
      { id: 3, tenantId: '01HTENHB3RHFCABBAHVXVBAV4W', schema: 'ne' },
    ])
}
