import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import corsOptions from "./config/cors.config";
import { env } from "./config/environment.config";
import { AppError, errorHandler } from "./errors/app-error";
import menuRoutes from "./routes/menu.routes";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", menuRoutes);

app.all("/{*splat}", (req: Request, _res: Response, next: NextFunction) => {
	next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

app
	.listen(env.BACKEND_PORT, () => {
		console.log(`Server running on port ${env.BACKEND_PORT} (${env.NODE_ENV})`);
	})
	.on("error", (err) => {
		console.error("Failed to start server:", err.message);
		process.exit(1);
	});
