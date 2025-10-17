import { Router } from "express";

import { createTrainingModule } from "../controllers/module.controller";

const router = Router();

router.post("/create-module", createTrainingModule);

export default router;
