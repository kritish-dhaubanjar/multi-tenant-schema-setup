import inquirer from 'inquirer'

import knex from '../../providers/database.provider'
import { DB_SCHEMAS } from '../../constants/database/schemas.constant'

async function make() {
  const schemas = Object.values(DB_SCHEMAS)

  const { seed, schema } = await inquirer.prompt([
    {
      name: 'seed',
      type: 'input',
      message: 'Enter seeder name (eg: organizations):',
    },
    {
      name: 'schema',
      type: 'list',
      message: 'Select schema:',
      choices: schemas,
    },
  ])

  const directory = `./database/seeders/${schema}`
  const stub = './database/stubs/seeder.stub'

  return knex.seed.make(seed, { directory, stub }).then(console.log)
}

make()
