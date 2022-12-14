import {
  getAllDetails,
  getAllUsers,
  getCurrentUserDetails,
  userDelete,
  userEdit,
  userLogin,
  userSignup,
} from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router()
  .get("/auth", authMiddleware, getCurrentUserDetails)
  .get("/all", getAllUsers)
  .get("/auth/admin", authMiddleware, getAllDetails)
  .post("/auth/login", userLogin)
  .post("/auth/signup", userSignup)
  .put("/auth", authMiddleware, userEdit)
  .delete("/auth", authMiddleware, userDelete);

export default router;
