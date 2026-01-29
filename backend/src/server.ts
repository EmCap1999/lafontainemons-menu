import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import "./config/environment.config.js";
import corsOptions from "./config/cors.config.js";
import { AppError, errorHandler } from "./errors/app-error.js";
import menuRoutes from "./routes/menu.routes.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", menuRoutes);

app.all("/{*splat}", (req: Request, _res: Response, next: NextFunction) => {
	next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
	const PORT = process.env.BACKEND_PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
		console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
	});

	if (!process.env.BACKEND_PORT) {
		console.warn("BACKEND_PORT not defined, using default port 3000");
	}
};

startServer().catch((err) => {
	console.error("Failed to start server:", err);
	process.exit(1);
});
