import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

export const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/task', taskRoutes)

