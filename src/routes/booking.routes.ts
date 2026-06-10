import { Router } from "express";
import {
  createBooking,
  getBookingDetails,
  getMyBookings,
} from "../controllers/booking.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/:bookingId", authMiddleware, getBookingDetails);

export default router;
