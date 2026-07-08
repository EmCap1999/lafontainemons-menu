import path from "node:path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { z } from "zod";

const envConfig = dotenv.config({ path: path.join(process.cwd(), "..", ".env") });
dotenvExpand.expand(envConfig);

const schema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	BACKEND_PORT: z.coerce.number(),
	FRONTEND_URL: z.url(),
	DATABASE_URL: z.url(),
});

export const env = schema.parse(process.env);
