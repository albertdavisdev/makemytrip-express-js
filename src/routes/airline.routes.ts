import { Router } from "express";
import { getAirlines } from "../controllers/airline.controller";

const router = Router();

router.get("/", getAirlines);

export default router;
