import express from "express"
import {handlelogin, handlesignup, handlelogout, handleprofileupdate, checkauth} from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/signup",handlesignup)
router.post("/login",handlelogin )
router.post("/logout",handlelogout)
router.put("/update-profile", protectRoute, handleprofileupdate)
router.get("/check", protectRoute, checkauth)
export default router