import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory(){
    const [categories,setcategories]=useState([]);
   
    const getcategories=async()=>{
        try {
           const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
           setcategories(data.category) 
        } catch (error) {
            console.log(error)
        }
    } 
    useEffect(()=>{
        getcategories();
    },[])
    return categories;
}