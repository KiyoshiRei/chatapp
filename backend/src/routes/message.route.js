import express from "express"
import { userMiddleware } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users",userMiddleware,getUsersForSidebar);
router.get("/:id",userMiddleware,getMessages);
router.post("/send/:id",userMiddleware, sendMessage);

export default router;