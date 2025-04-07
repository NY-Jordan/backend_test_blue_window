import { Router } from "express";
import authController from "../controllers/auth.controller";
import { registerValidator } from "../validators/authValidators";

const authRoutes = Router();

authRoutes.post('/register', registerValidator ,authController.register);
authRoutes.post('/login', authController.login);

export default authRoutes;