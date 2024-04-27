import { Model } from '../models'
import database from '../providers/database.provider'

Model.connect(database)
