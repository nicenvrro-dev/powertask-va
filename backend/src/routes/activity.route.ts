import { Router } from "express";

import {
  fetchActivityLogs,
  createActivityLog,
} from "../controllers/activity.controller";

const router = Router();

router.get("/fetch", fetchActivityLogs);
router.post("/create", createActivityLog);

export default router;
