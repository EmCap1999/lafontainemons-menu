import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@lafontaine/database/src/schema';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');
console.log(`Loading environment from: ${envPath}`);
const myEnv = dotenv.config({ path: envPath });
dotenvExpand.expand(myEnv);
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required in environment variables');
}
const client = postgres(process.env.DATABASE_URL, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
});
export const db = drizzle(client, { schema });
export { client };
//# sourceMappingURL=db.js.map