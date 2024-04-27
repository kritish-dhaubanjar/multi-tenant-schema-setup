import inquirer from 'inquirer'

import knex from '../../providers/database.provider'
import { DB_SCHEMAS } from '../../constants/database/schemas.constant'

const sharedSchemaDirname: string = 'common'

async function make() {
  const schemas = Object.values(DB_SCHEMAS)

  const { migration, schema } = await inquirer.prompt([
    {
      name: 'migration',
      type: 'input',
      message: 'Enter migration name (eg: create_organizations_table):',
    },
    {
      name: 'schema',
      type: 'list',
      message: 'Select schema:',
      choices: [...schemas, sharedSchemaDirname],
    },
  ])

  const isSchema = schemas.includes(schema)

  const stub = './database/stubs/migration.stub'

  const directory = isSchema
    ? `./database/migrations/schemas/${schema}`
    : `./database/migrations/${sharedSchemaDirname}`

  return knex.migrate.make(migration, { directory, stub }).then(console.log)
}

make()
