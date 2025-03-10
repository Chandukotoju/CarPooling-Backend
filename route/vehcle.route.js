import express from "express";
import { addVehcle, getVehcles } from "../controller/vehcle.controller.js";
import { verifyToken } from "../middleware/auth.js";
const router=express.Router();

router.post("/register",verifyToken, addVehcle); 
router.get("/getVehcles",verifyToken,getVehcles)

export default router;