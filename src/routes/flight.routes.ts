import { Router } from "express";
import { getFlights, searchFlights } from "../controllers/flight.controller";

const router = Router();

router.get("/", getFlights);
router.get("/search", searchFlights);

export default router;
