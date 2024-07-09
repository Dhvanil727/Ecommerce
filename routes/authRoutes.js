import express from "express";
import {registercontroller,logincontroller,testcontroller} from "../controllers/authController.js"
import { requireSignIN,isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router=express.Router();

//routing 

//Register || method post
router.post('/register',registercontroller);

//Login || method POST
router.post('/login',logincontroller);

//test route
router.get('/test',requireSignIN,isAdmin,testcontroller);
export default router;