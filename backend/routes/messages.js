import {
  getMessagesOfThisChat,
  sendMessage,
} from "../controllers/MessageController.js";
import { Router } from "express";

const router = Router().get("/", getMessagesOfThisChat).post("/", sendMessage);

export default router;
