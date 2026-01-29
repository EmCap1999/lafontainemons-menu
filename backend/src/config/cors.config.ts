import type { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
	origin: process.env.FRONTEND_URL,
	methods: "GET, POST, PUT, DELETE",
	allowedHeaders: "Content-Type, Authorization",
};

export default corsOptions;
