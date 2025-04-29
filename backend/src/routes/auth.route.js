import express from "express"
import { userMiddleware } from "../middleware/auth.middleware.js";
import { logout, signin, signup, updateProfile ,checkAuth} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup)

router.post("/signin",signin)

router.post("/logout",logout)

router.put("/update-profile",userMiddleware, updateProfile)

router.get("/check",userMiddleware,checkAuth)

export default router; 
