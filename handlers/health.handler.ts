import database from '@/providers/database.provider'

export async function postgresStatus() {
  try {
    await database.raw('select 1')

    return { status: 'ok', postgres: 'up' }
  } catch {
    return { status: 'error', postgres: 'down' }
  }
}
