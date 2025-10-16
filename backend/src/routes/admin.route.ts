import { Router } from "express";

import {
  getAllAdminAccount,
  createAdminAccount,
} from "../controllers/admin.controller";

const router = Router();

router.get("/get-all-admin", getAllAdminAccount);
router.post("/create-admin-account", createAdminAccount);

export default router;
