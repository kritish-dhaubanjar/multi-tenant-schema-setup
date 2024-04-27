import { Knex } from 'knex'
import { TABLES } from '../../../constants/database/tables.constant'
import { DB_SCHEMAS } from '../../../constants/database/schemas.constant'

export async function seed(knex: Knex): Promise<void> {
  await knex.withSchema(DB_SCHEMAS.TX).table(TABLES.organizations).del()

  await knex
    .withSchema(DB_SCHEMAS.TX)
    .table(TABLES.organizations)
    .insert([
      {
        id: 1,
        orgId: 'fb625d663e9e',
        name: 'Texas Child Psychiatry Access Network',
        type: 'AP_Main',
      },
      { id: 2, orgId: '17c34a70468e', name: 'Baylor College of Medicine', type: 'AP_Hub' },
      { id: 3, orgId: '2c99d233ed9c', name: 'St. Joseph Medical Center', type: 'AP_Clinic' },
    ])
}
