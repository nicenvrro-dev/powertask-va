import { Router } from "express";

import { createUserAccount, loginAccount } from "../controllers/user.controller";

const router = Router();

router.post("/create-user-account", createUserAccount);
router.post("/login", loginAccount);

export default router;
