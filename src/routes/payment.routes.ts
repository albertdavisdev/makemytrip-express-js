import { Router } from "express";
import { payBooking } from "../controllers/payment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/pay/:bookingId", authMiddleware, payBooking);

export default router;
