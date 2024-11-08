
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken"
import orderModel from "../models/orderModel.js";
export const registercontroller=async(request,response)=>{
try {
    const {name,email,password,phone,address,answer}=request.body;
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
    if(!answer){
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
    const user=await new userModel({name,email,phone,address,answer,password:hashedPassword}).save();
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
            phone:user.phone,
            role:user.role
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

//forgot pass controller
export const forgotpasscontroller=async(request,response)=>{
    try {
        const {email,answer,newpassword}=request.body;
        if(!email){
            response.send({message:"email is required"});
        }
        if(!answer){
            response.send({message:"answer is required"});
        }
        if(!newpassword){
            response.send({message:"newpassword is required"});
        }
        const user=await userModel.findOne({email,answer});
        if(!user){
            response.status(404).send({
                success:false,
                message:"wrong email or answer"
            })
        }
        const hashed=await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        response.status(200).send({
            success:true,
            message:"Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
}
//test
export const testcontroller=(request,response)=>{
    response.send("Protected route");
}

export const updateprofilecontroller=async(request,response)=>{
    // try {
    //     const {name, password,phone,address}=request.body;
    //     console.log(request.body)
    //     const user=await userModel.findById(request.user._id);
    //     if(password && password.length<6){
    //         return response.json({error:"Password is required 6 character long"})
    //     }
    //     const hashedPassword=password? hashPassword(password): undefined;
    //     const updateduser=await findByIdAndUpdate(request.user._id,
    //     {
    //         name: name || user.name,
    //         password: hashedPassword || user.password,
    //         phone: phone || user.phone,
    //         address: address || user.address
    //     },
    //     {new:true}
    // );
    // response.status(200).send({
    //     success:true,
    //     message:"Profile updated successfully",
    //     updateduser
    // });
    // } catch (error) {
    //     console.log(error);
    //     console.log(request.body) 
    //     response.status(400).send({
    //         success:false,
    //         message:"Error while updating profile",
    //         error
    //     })
    // }
    try {
        const { name, email, password, address, phone } = request.body;
        const user = await userModel.findById(request.user._id);
        //password
        if (password && password.length < 6) {
          return response.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          request.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        response.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        response.status(400).send({
          success: false,
          message: "Error WHile Update profile",
          error,
        });
      }
}
export const getOrdersController = async (request, response) => {
    try {
      const orders = await orderModel
        .find({buyer: request.user._id})
        .populate("products", "-photo")
        .populate("buyer", "name")
        // .sort({ createdAt: "-1" });
      response.json(orders);
      console.log(orders);
    } catch (error) {
      console.log(error);
      response.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        // .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };