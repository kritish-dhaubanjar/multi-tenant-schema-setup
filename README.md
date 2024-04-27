# backend-with-sql

# Table of Contents
1. [Directory Structure](#directory-structure)
2. [Environment Variables](#environment-variables)
3. [Database Migrations](#database-migrations)
   1. Create a new migration
   2. Run a migration
4. [Database Seeders](#database-seeders)
   1. Create a new seeder
   2. Run a seeder
5. Bootstrap TS app with JS app

### 1. Directory Structure

<a name="directory-structure"></a>

```
├── babel.config.json
├── bootstrap                                                         # bootstrap with existing trayt-api
│   └── app.ts
├── config                                                            # application wide configurations
│   ├── database.config.ts
│   ├── migration.config.ts
│   └── signer.config.ts
├── constants                                                         # application wide constants
│   ├── database
│   │   ├── schemas.constant.ts
│   │   └── tables.constant.ts
│   └── errors.constant.ts
├── controllers                                                       # http contollers
├── database                                                          # database migrations, seeders, stubs
│   ├── migrations
│   │   └── schemas
│   │       ├── public
│   │       └── trayt
│   │           └── 20240331080833_create_organizations_table.ts
│   ├── seeders
│   │   ├── public
│   │   └── trayt
│   │       └── 20240402182202_organizations.seeder.ts
│   └── stubs
│       ├── migration.stub
│       └── seeder.stub
├── env                                                               # application wide environment variables
│   └── index.ts
├── errors                                                            # error categories
│   ├── en_US.errors.ts
│   └── errors.ts
├── index.ts
├── jest.config.ts
├── middlewares                                                       # http middlewares
│   └── error.middleware.ts
├── models                                                            # ORM models
│   ├── BaseModel.ts
│   ├── index.ts
│   └── Organization.model.ts
├── package.json
├── policies
├── prompts                                                           # prompts for migrations, seeders
│   └── database
│       ├── migrate.make.ts
│       ├── seed.make.ts
│       └── seed.run.ts
├── provider                                                          # service providers
│   ├── database.provider.ts
│   └── storage.provider.ts
├── README.md
├── resources                                                         # external resources
│   └── global-bundle.pem
├── services                                                          # http services
├── utils                                                             # utilities
│   ├── object.test.ts
│   └── object.ts
└── validators                                                        # http validators
```

### 2. Environment Variables (.env)

<a name="environment-variables"></a>

Note:

- For AWS RDS, set `DB_USER` to a valid database user. `DB_PASSWORD` is not expected as it is resolved by `Signer` using AWS credentials.
- For AWS RDS, set `DB_SSL` to `true`, to enable [SSL/TLS encryption](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html) in connection.

Refer to `.env.example` for sample configuration.

```
DB_CLIENT=pg
DB_HOST=localhost
DB_SSL=
DB_PORT=5432
DB_REGION=us-west-2
DB_DATABASE=trayt_db
DB_USER=trayt_user
DB_PASSWORD=trayt_password
DB_MIN_POOL_SIZE=1
DB_MAX_POOL_SIZE=2
DB_CONNECTION_TIMEOUT_MILLISECONDS=10000

DB_MIGRATION_SCHEMA_NAME=trayt
```

### 3. Database Migrations

<a name="database-migrations"></a>

#### i. Create a new migration

```bash
npm run migrate:make
```

#### ii. Run a migration

```bash
npm run knex migrate:up
```

### 4. Database Seeders

<a name="database-seeders"></a>

#### i. Create a new seeder

```bash
npm run seed:make
```

#### ii. Run a seeder

```bash
npm run seed:run
```

#### 5. Bootstrap TS app with JS app

In `app.js`

```javascript
/* SQL */
require('@backend-with-sql')
const sqlRoutes = require('@routes/backend-with-sql/routes')

app.use('/api', sqlRoutes)
/* SQL */
```
