import { Router } from "express";
import {
  register,
  login,
  profile,
  registerSchema,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

import { validate } from "../middlewares/validate.middleware";
const router = Router();

router.post("/register", validate(registerSchema), register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: albert@test.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", login);
router.get("/profile", authMiddleware, profile);

export default router;
