import { Router } from "express";

import {
  createTrainingModule,
  fetchServicesData,
} from "../controllers/module.controller";

const router = Router();

router.post("/create-module", createTrainingModule);
router.get("/fetch-services-data", fetchServicesData);

export default router;
