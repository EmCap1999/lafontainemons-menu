import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@lafontaine/database/src/schema';
export type DrizzleDatabase = ReturnType<typeof drizzle<typeof schema>>;
declare const client: postgres.Sql<{}>;
export declare const db: DrizzleDatabase;
export { client };
//# sourceMappingURL=db.d.ts.map