import { keyBy } from 'lodash'
import Model, { OrderBy, SORT } from './Model'
import { TABLES } from '../constants/database/tables.constant'
import { DB_SCHEMAS } from '../constants/database/schemas.constant'

export default class Tenant extends Model {
  protected static schema = DB_SCHEMAS.public

  protected static primaryKey: string = 'tenantId'
  protected static table: string = TABLES.tenants

  protected static orderBy: OrderBy = { column: 'tenantId', order: SORT.DESC }

  protected static tenants: Record<string, object>

  private static async boot() {
    const tenants = await this.all()
    this.tenants = keyBy(tenants, this.primaryKey)
  }

  public static async get(tenantId: string): Promise<{ schema?: string } | undefined> {
    if (!this.tenants) {
      await Tenant.boot()
    }

    return this.tenants[tenantId]
  }
}
