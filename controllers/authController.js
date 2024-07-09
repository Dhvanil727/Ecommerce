
import { response } from "express";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
export const registercontroller=async(request,response)=>{
try {
    const {name,email,password,phone,address}=request.body;
    if(!name){
        response.send({message:"Name is required"});
    }
    if(!email){
        response.send({message:"email is required"});
    }
    if(!password){
        response.send({message:"password is required"});
    }
    if(!phone){
        response.send({message:"Phone number is required"});
    }
    if(!address){
        response.send({message:"Address is required"});
    }

    //existing user
    const existinguser=await userModel.findOne({email});
    if(existinguser){
        return response.status(200).send({
            success:false,
            message:"user already exists please log in"
        })
    }

    // register user
    const hashedPassword=await hashPassword(password);
    // save
    const user=await new userModel({name,email,phone,address,password:hashedPassword}).save();
    response.status(200).send({
        success:true,
        message:"User Registered Successfully"
    }) 
} catch (error) {
    console.log(error);
    response.status(500).send({
        success:false,
        message:"error in registration",
        error
    })
}
};

//Post Login controller

export const logincontroller=async(request,response)=>{
    try {
        const {email,password}=request.body;
    //validation
    if(!email || !password){
        return response.status(400).send({
            success:false,
            message:"Invalid email or password"
        })
    }
    const user=await userModel.findOne({email});
    if(!user){
        return response.status(404).send({
            success:false,
            message:"Email is not registered"
        })
    }
    const match=await comparePassword(password,user.password);
    if(!match){
        return response.status(200).send({
            success:false,
            message:"Invalid Password"
        })
    }
    //token
    const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    response.status(200).send({
        success:true,
        message:"Login Successful",
        user:{
            name:user.name,
            email:user.email,
            address:user.address,
            phone:user.phone

        },
        token

    });
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}


//test
export const testcontroller=(request,response)=>{
    response.send("Protected route");
}