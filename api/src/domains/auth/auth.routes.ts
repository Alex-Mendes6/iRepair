import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', authController.register.bind(authController));
authRoutes.post('/login', authController.login.bind(authController));
authRoutes.post('/logout', authMiddleware, authController.logout.bind(authController));
authRoutes.get('/me', authMiddleware, authController.me.bind(authController));

export { authRoutes };