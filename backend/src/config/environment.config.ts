import path from "node:path";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const envPath = path.join(process.cwd(), "..", ".env");

console.log(`Loading environment from: ${envPath}`);

const envConfig = dotenv.config({ path: envPath });

dotenvExpand.expand(envConfig);

export { envConfig as default };
