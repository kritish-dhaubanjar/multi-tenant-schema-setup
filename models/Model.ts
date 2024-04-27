import { Knex } from 'knex'
import storage from '../providers/storage.provider'
import { DB_SCHEMAS } from '../constants/database/schemas.constant'

export enum SORT {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Pagination {
  page: number
  perPage: number
}

export interface OrderBy {
  column: string
  order: SORT
}

interface QueryConfiguration {
  transaction?: Knex.Transaction
  schema?: DB_SCHEMAS
}

export default class Model {
  protected static schema: DB_SCHEMAS

  protected static table: string
  protected static primaryKey: string

  protected static orderBy: OrderBy
  protected static perPage: number = 15

  public static connection: Knex

  constructor(attributes: object) {
    Object.assign(this, attributes)
  }

  public static connect(connection: Knex): void {
    this.connection = connection
  }

  public static disconnect(): void {
    this.connection.destroy()
  }

  public static getSchema(): DB_SCHEMAS {
    if (this.schema) {
      return this.schema
    }

    const store = storage.getStore() as Map<string, string>

    return store.get('schema') as DB_SCHEMAS
  }

  public static queryBuilder(
    schema: DB_SCHEMAS = this.getSchema(),
    transaction?: Knex.Transaction
  ): Knex.QueryBuilder {
    return (transaction || this.connection).withSchema(schema)
  }

  public static all(
    columns: string[] = ['*'],
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.queryBuilder(schema, transaction).select(columns).from(this.table)
  }

  public static where(
    attributes: object,
    columns: string[] = ['*'],
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.all(columns, { transaction, schema }).where(attributes)
  }

  public static find(
    id: string | number,
    columns: string[] = ['*'],
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.all(columns, { transaction, schema })
      .where({ [this.primaryKey]: id })
      .first()
  }

  public static paginate(
    attributes: object = {},
    columns: string[] = ['*'],
    {
      pagination = { page: 1, perPage: this.perPage },
      orderBy = [this.orderBy],
    }: { pagination?: Pagination; orderBy?: OrderBy[] },
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    const offset = (pagination.page - 1) * pagination.perPage

    return this.where(attributes, columns, { transaction, schema })
      .limit(pagination.perPage)
      .offset(offset)
      .orderBy(orderBy)
  }

  public static create(
    attributes: object,
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.queryBuilder(schema, transaction).insert(attributes).into(this.table).returning('*')
  }

  public static update(
    id: string | number,
    attributes: object,
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.queryBuilder(schema, transaction)
      .update(attributes)
      .table(this.table)
      .where({ [this.primaryKey]: id })
      .returning('*')
  }

  public static destroy(
    id: string | number,
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Knex.QueryBuilder {
    return this.queryBuilder(schema, transaction)
      .where({ [this.primaryKey]: id })
      .from(this.table)
      .del()
      .returning('*')
  }

  public static async findOrFail<T extends Model>(
    id: string | number,
    columns: string[] = ['*'],
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Promise<T | null> {
    const result = await this.find(id, columns, { transaction, schema })

    if (!result) {
      throw Error()
    }

    return result
  }

  public static async count(
    attributes: object = {},
    { transaction, schema = this.getSchema() }: QueryConfiguration = {}
  ): Promise<number> {
    const [{ count = 0 }] = await this.all([], { transaction, schema }).where(attributes).count()

    return Number(count)
  }
}
