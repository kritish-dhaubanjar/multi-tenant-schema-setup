import type { SignerConfig } from '@aws-sdk/rds-signer'

import env from '../env'

import { credentials } from '../../config/awsConfig'

export default {
  region: env.DB_REGION,
  port: env.DB_PORT,
  hostname: env.DB_HOST,
  username: env.DB_USER,
  credentials,
} as SignerConfig
