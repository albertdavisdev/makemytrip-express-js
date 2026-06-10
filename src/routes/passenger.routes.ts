import { Router } from "express";
import {
  addPassenger,
  getPassengers,
} from "../controllers/passenger.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/:bookingId/passengers", authMiddleware, addPassenger);

router.get("/:bookingId/passengers", authMiddleware, getPassengers);

export default router;
