import type { CorsOptions } from "cors";
import { env } from "./environment.config";

const corsOptions: CorsOptions = {
	origin: env.FRONTEND_URL,
	methods: "GET, POST, PUT, DELETE",
	allowedHeaders: "Content-Type, Authorization",
};

export default corsOptions;
