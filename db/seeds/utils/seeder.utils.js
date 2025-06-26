import { db } from '../../config/database.config.js'

export const clearDatabase = async () => {
  console.log('Cleaning database...')

  await db.execute('TRUNCATE public.item CASCADE')
  await db.execute('TRUNCATE public.subsection CASCADE')
  await db.execute('TRUNCATE public.section CASCADE')

  await db.execute('ALTER SEQUENCE IF EXISTS section_id_seq RESTART WITH 1')
  await db.execute('ALTER SEQUENCE IF EXISTS subsection_id_seq RESTART WITH 1')
  await db.execute('ALTER SEQUENCE IF EXISTS item_id_seq RESTART WITH 1')

  console.log('Database cleaned')
}

export const logWithTime = (message) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${message}`)
}

export const measureTime = async (label, fn) => {
  const start = Date.now()
  console.log(`⏳ Starting: ${label}`)

  try {
    const result = await fn()
    const duration = Date.now() - start
    console.log(`Completed: ${label} (${duration}ms)`)
    return result
  } catch (error) {
    const duration = Date.now() - start
    console.error(`Failed: ${label} (${duration}ms)`, error)
    throw error
  }
}
