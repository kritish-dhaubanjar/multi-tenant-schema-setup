import fs from 'fs'
import path from 'path'
import { Knex } from 'knex'

import env from '../env'
import { DB_SCHEMAS } from '../constants/database/schemas.constant'

export default class MigrationSource implements Knex.MigrationSource<string> {
  private directories: string[]
  private sharedSchemaDirname: string = 'common'

  /**
   * A class representing a source for database migrations.
   * This class is responsible for managing and retrieving migration files based on the specified schema.
   * It filters directories based on the environment configuration and schema name, and provides methods to get individual migrations and all migrations.
   */
  constructor(migrationSources: string[]) {
    this.directories = migrationSources.filter((directory) => {
      const isPublic = env.DB_MIGRATION_SCHEMA_NAME === DB_SCHEMAS.public

      if (isPublic) {
        return directory.endsWith(DB_SCHEMAS.public)
      }

      return (
        directory.endsWith(this.sharedSchemaDirname) ||
        directory.endsWith(env.DB_MIGRATION_SCHEMA_NAME)
      )
    })
  }

  /**
   * Retrieves a specific migration file and returns its up and down functions.
   */
  getMigration(migration: string): Promise<Knex.Migration> {
    const { up, down }: Knex.Migration = require(migration)

    return Promise.resolve({
      up,
      down,
    })
  }

  /**
   * Extracts the name of a migration file without its extension.
   */
  getMigrationName(migration: string): string {
    return path.basename(migration, '.ts')
  }

  /**
   * Retrieves all migration files from the specified directories, sorts them by their timestamp, and returns their paths.
   */
  getMigrations(): Promise<Array<string>> {
    const migrations = this.directories.reduce((migrations: Array<string>, directory) => {
      const files = fs.readdirSync(directory)

      for (const file of files) {
        if (file.endsWith('.ts')) {
          migrations.push(path.join(directory, file))
        }
      }

      return migrations
    }, [])

    const sortedMigrations = migrations.sort((a, b) => {
      const aTimestamp = Number(path.basename(a, '.ts').split('_')[0])
      const bTimestamp = Number(path.basename(b, '.ts').split('_')[0])

      return aTimestamp - bTimestamp
    })

    return Promise.resolve(sortedMigrations)
  }
}
