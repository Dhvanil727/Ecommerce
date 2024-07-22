import express from "express"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/create-product",requireSignIN,isAdmin,createproductcontroller);

export default router;