import { fileURLToPath } from 'node:url'
import { runDatabaseSeeding } from './seeders/DatabaseSeeder.js'

const __filename = fileURLToPath(import.meta.url)

if (process.argv[1] === __filename) {
  runDatabaseSeeding()
    .then(() => {
      console.log('Seeding process completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding process failed:', error)
      process.exit(1)
    })
}

export { runDatabaseSeeding }
