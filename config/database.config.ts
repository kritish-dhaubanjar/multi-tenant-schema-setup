import path from 'path'
import { Signer } from '@aws-sdk/rds-signer'

import type { Knex } from 'knex'
import { snakeCase } from 'lodash'

import env from '../env'
import signerConfig from './signer.config'
import MigrationSource from './migration.config'

import { DB_SCHEMAS } from '../constants/database/schemas.constant'
import { convertObjectKeysToCamelCase } from '../utilities/object'

export default {
  client: env.DB_CLIENT,
  connection: {
    user: env.DB_USER,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    connectTimeout: env.DB_CONNECTION_TIMEOUT_MILLISECONDS,
    ssl: env.DB_SSL
      ? { rejectUnauthorized: false, ca: path.resolve('../resources/global-bundle.pem') }
      : false,
    password: () => env.DB_PASSWORD || new Signer(signerConfig).getAuthToken(),
  },
  pool: {
    max: env.DB_MAX_POOL_SIZE,
    min: env.DB_MIN_POOL_SIZE,
  },
  migrations: {
    extension: 'ts',
    stub: '../database/stubs/migration.stub',
    schemaName: env.DB_MIGRATION_SCHEMA_NAME,
    migrationSource: new MigrationSource([
      '../database/migrations/common',
      ...Object.values(DB_SCHEMAS).map((schema) => `../database/migrations/schemas/${schema}`),
    ]),
  },
  seeds: {
    directory: '../database/seeders',
    stub: '../database/stubs/seeder.stub',
    extension: 'seeder.ts',
    timestampFilenamePrefix: true,
  },
  postProcessResponse: (result) => {
    return Array.isArray(result)
      ? result.map(convertObjectKeysToCamelCase)
      : convertObjectKeysToCamelCase(result)
  },
  wrapIdentifier: (value, origImpl) => {
    const convertedValue = value === '*' ? value : snakeCase(value)

    return origImpl(convertedValue)
  },
} as Knex.Config
