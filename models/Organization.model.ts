import Model, { OrderBy, SORT } from './Model'
import { TABLES } from '../constants/database/tables.constant'

export default class Organization extends Model {
  protected static primaryKey: string = 'orgId'
  protected static table: string = TABLES.organizations

  protected static orderBy: OrderBy = { column: 'name', order: SORT.DESC }
}
