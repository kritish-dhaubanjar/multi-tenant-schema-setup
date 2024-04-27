import fs from 'fs'
import inquirer from 'inquirer'

import knex from '../../providers/database.provider'
import { DB_SCHEMAS } from '../../constants/database/schemas.constant'

async function seed() {
  const schemas = Object.values(DB_SCHEMAS)

  const { schema, specifics } = await inquirer.prompt([
    {
      name: 'schema',
      type: 'list',
      message: 'Select schema:',
      choices: schemas,
    },
    {
      name: 'specifics',
      type: 'checkbox',
      message: 'Select seeders:',
      choices: ({ schema }) => fs.readdirSync(`./database/seeders/${schema}`),
    },
  ])

  const directory = `./database/seeders/${schema}`

  for (const specific of specifics) {
    await knex.seed.run({ directory, specific }).then(console.log)
  }

  await knex.destroy()
}

seed()
