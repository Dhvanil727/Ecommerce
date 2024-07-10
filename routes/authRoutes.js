import express, { request, response } from "express";
import {registercontroller,logincontroller,testcontroller, forgotpasscontroller} from "../controllers/authController.js"
import { requireSignIN,isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router=express.Router();

//routing 

//Register || method post
router.post('/register',registercontroller);

//Login || method POST
router.post('/login',logincontroller);

//forgot password || post
router.post('/forgot-password',forgotpasscontroller);
//test route
router.get('/test',requireSignIN,isAdmin,testcontroller);



//protected route
router.get("/user-auth",requireSignIN,(request,response)=>{
    response.status(200).send({ok:true});
})
export default router;