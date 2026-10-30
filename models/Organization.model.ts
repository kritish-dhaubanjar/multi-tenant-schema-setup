import Model, { OrderBy, SORT } from '@/models/BaseModel'
import { DB_SCHEMAS } from '@/constants/database/schemas.constant'
import { TABLES } from '@/constants/database/tables.constant'

export default class Organization extends Model {
  protected static schema = DB_SCHEMAS.public
  protected static primaryKey: string = 'orgId'
  protected static table: string = TABLES.organizations

  protected static orderBy: OrderBy = { column: 'name', order: SORT.DESC }
}
