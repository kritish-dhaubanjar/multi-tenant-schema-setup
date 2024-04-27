import { z } from 'zod'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const environmentSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_REGION: z.string(),
  DB_DATABASE: z.string(),
  DB_MAX_POOL_SIZE: z.coerce.number(),
  DB_CONNECTION_TIMEOUT_MILLISECONDS: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string().optional(),
  DB_CLIENT: z.enum(['pg']),
  DB_SSL: z.coerce.boolean(),
  DB_MIN_POOL_SIZE: z.coerce.number(),
  DB_MIGRATION_SCHEMA_NAME: z.string(),
})

const environmentVariables = environmentSchema.safeParse(process.env)

if (!environmentVariables.success) {
  console.error('Invalid environment variables.')

  console.dir(environmentVariables.error.errors, { depth: null })

  process.exit(1)
}

export default environmentVariables.data
