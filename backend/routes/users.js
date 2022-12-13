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
  .get("/", authMiddleware, getCurrentUserDetails)
  .get("/all", authMiddleware, getAllUsers)
  .get("/admin", authMiddleware, getAllDetails)
  .post("/login", userLogin)
  .post("/signup", userSignup)
  .put("/", authMiddleware, userEdit)
  .delete("/", authMiddleware, userDelete);

export default router;
