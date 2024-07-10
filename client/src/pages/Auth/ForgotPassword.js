import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Authstyles.css";
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const ForgotPassword = () => {
    const [email, setemail] = useState("");
    const [answer, setanswer] = useState("");
    const [newpassword, setnewpassword] = useState("");

    const navigate=useNavigate();

    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
       
            const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newpassword});
       
            if(res.data.success){
                toast.success(res.data.message);
                
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
      }
  return (
    <Layout title={"Forgot Password-Ecommerce app"}>
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handlesubmit}>
        <h4 className="title">RESET PASSWORD</h4>
        
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e)=>setemail( e.target.value) }
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={answer}
            onChange={(e)=>setanswer( e.target.value) }
            placeholder="Enter your sport"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={newpassword}
            onChange={(e)=>setnewpassword( e.target.value) }
            placeholder="Enter your new password"
            required
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default ForgotPassword