import { response } from "express";
import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";


//protected routes token based
export const requireSignIN=async(request,response,next)=>{
    try {
        const decode=JWT.verify(request.headers.authorization,process.env.JWT_SECRET);
        request.user=decode;
    next();
    } catch (error) {
        console.log(error);
    }
}

//admin access
export const isAdmin=async(request,response,next)=>{
    try {
        const user=await userModel.findById(request.user._id);
        if(user.role!==1){
            return response.status(401).send({
                success:false,
                message:"Unauthorized access"

            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}