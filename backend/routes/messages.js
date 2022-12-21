import {
  getMessagesOfThisChat,
  sendMessage,
} from "../controllers/MessageController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from "express";

const router = Router()
  .get("/to/:id", authMiddleware, getMessagesOfThisChat)
  .post("/to/:id", authMiddleware, sendMessage);

export default router;
