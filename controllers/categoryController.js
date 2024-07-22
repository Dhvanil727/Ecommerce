import { request, response } from "express";
import categoryModel from "../models/categoryModel.js"
import slugify from "slugify";
export const createcategorycontroller=async(request,response)=>{
    try {
        const{name}=request.body;
        if(!name) response.status(401).send({message:"name is required"});
        const existingcategory=await categoryModel.findOne({name});
        if(existingcategory){
            response.status(200).send({
                success:true,
                message:"category already exist"
            })
        }
        const category=await new categoryModel({name, slug:slugify(name)}).save();
        response.status(200).send({
            success:true,
            message:"category created successfully",
            category
        })
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success:false,
            message:" error in category",
            error
        })
    }
}
export const updadecategorycontroller=async(request,response)=>{
    try {
        const {name}=request.body;
        const {id}=request.params;
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        response.status(200).send({
            success:true,
            message:"category updated successfully",
        })
    } catch (error) {
        
    }
}
export const getallactegorycontroller=async(request,response)=>{
    try {
        const category=await categoryModel.find({});
        response.status(200).send({
            success:true,
            message:"category fetched successfully",
            category
        })
    } catch (error) {
        response.status(500).send({
            success:false,
            message:"error in get all category",
            error
        })
    }
}

export const getsinglecategorycontroller=async(request,response)=>{
    try {
        const category=await categoryModel.findOne({slug:request.params.slug});
        response.status(200).send({
            success:true,
            message:"category fetched successfully",
            category
        })
    } catch (error) {
        response.status(501).send({
            success:false,
            message:"error in get single category",
            error
        })

    }
}
export  const deletecategorycontroller=async(request,response)=>{
    try {
        const {id}=request.params;
        await categoryModel.findByIdAndDelete(id);
        response.status(200).send({
            success:true,
            message:"category deleted successfully",

        })
    } catch (error) {
        response.status(500).send({
            success:false,
            message:"error in delete category",
            error
        })
    }
}