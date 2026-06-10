import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadSingleFile } from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/single", authMiddleware, upload.any(), uploadSingleFile);
export default router;
