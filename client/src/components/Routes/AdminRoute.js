import { useEffect,useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";


export default function AdminRoute(){
const[ok,setok]=useState(false);
const [auth,setauth]=useAuth();
useEffect(()=>{
const authcheck=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
    
if(res.data.ok){
    setok(true);
}else{
    setok(false);
}
};
if(auth?.token) authcheck();
},[auth?.token])
return ok?<Outlet/> :<Spinner  path=""/>
}