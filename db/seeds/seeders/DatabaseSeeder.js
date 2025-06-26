import { testConnection } from '../../config/database.config.js'
import { clearDatabase, measureTime } from '../utils/seeder.utils.js'
import { runItemSeeding } from './ItemSeeder.js'
import { runSectionSeeding } from './SectionSeeder.js'
import { runSubsectionSeeding } from './SubsectionSeeder.js'

export const runDatabaseSeeding = async () => {
  console.log('Starting database seeding...')

  try {
    await measureTime('Database connection test', async () => {
      const isConnected = await testConnection()
      if (!isConnected) {
        throw new Error('Database connection failed')
      }
    })

    await measureTime('Database cleanup', clearDatabase)
    await measureTime('Sections seeding', runSectionSeeding)
    await measureTime('Subsections seeding', runSubsectionSeeding)
    await measureTime('Items seeding', runItemSeeding)

    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Database seeding failed:', error)
    throw error
  }
}
