import { Router } from "express";
import authController from "../controllers/auth.controller";
import { loginValidator, registerValidator } from "../validators/authValidators";

const authRoutes = Router();

authRoutes.post('/register', registerValidator ,authController.register);
authRoutes.post('/login',loginValidator,  authController.login);

export default authRoutes;