import { Router } from "express";

import {
  getAllUserAccount,
  createUserAccount,
  loginAccount,
  deleteUserById,
} from "../controllers/user.controller";

const router = Router();

router.get("/get-all-user", getAllUserAccount);
router.post("/create-user-account", createUserAccount);
router.post("/login", loginAccount);
router.delete("/delete/:id", deleteUserById);

export default router;
