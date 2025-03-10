import { createTravelPlan } from "../controller/travel.controller.js"; 
import { verifyToken } from "../middleware/auth.js";
import { updateTravelPlan } from "../controller/travel.controller.js";
import { deletePlan } from "../controller/travel.controller.js"; 
import { bookSeat } from "../controller/booking.controller.js";
import { cancelSeat } from "../controller/booking.controller.js";
import { verifyOwner } from "../middleware/authRole.js";
import { getPlans } from "../controller/travel.controller.js";
import { getAllTravelPlans } from "../controller/travel.controller.js";
import { getBookings } from "../controller/booking.controller.js";
import express from "express";

const router = express.Router(); 

router.get("/plans", verifyToken,verifyOwner, getPlans);
router.post("/create",verifyToken,verifyOwner, createTravelPlan); 
router.put("/update/:travelId",verifyToken,verifyOwner, updateTravelPlan);
router.delete("/delete/:travelId",verifyToken,verifyOwner, deletePlan);

router.get("/getAllPlans", verifyToken, getAllTravelPlans);
router.post("/book",verifyToken,bookSeat);  
router.post("/cancel",verifyToken,cancelSeat); 
router.get("/getBookings", verifyToken, getBookings);
export default router;