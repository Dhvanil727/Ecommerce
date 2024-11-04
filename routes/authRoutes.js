import express, { request, response } from "express";
import {registercontroller,logincontroller,testcontroller, forgotpasscontroller, updateprofilecontroller, getAllOrdersController, getOrdersController, orderStatusController} from "../controllers/authController.js"
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



//protected  user route
router.get("/user-auth",requireSignIN,(request,response)=>{
    response.status(200).send({ok:true});
})

//protected admin route
router.get("/admin-auth",requireSignIN,isAdmin,(request,response)=>{
    response.status(200).send({ok:true});
})

router.put("/profile", requireSignIN,updateprofilecontroller);
router.get("/orders", requireSignIN, getOrdersController);
router.get("/all-orders", requireSignIN,  isAdmin,getAllOrdersController);
router.put(
    "/order-status/:orderId",
    requireSignIN,
    isAdmin,
    orderStatusController
  );
export default router;