import knex from 'knex'

import databaseConfig from '../config/database.config'

export default knex(databaseConfig)
