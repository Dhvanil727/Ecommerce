import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Authstyles.css";
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom"
const Login = () => {
    const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/");
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
  }
  return (
    <Layout title={"Register"}>
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handlesubmit}>
        <h4 className="title">LOGIN FORM</h4>
        
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e)=>setpassword( e.target.value) }
            placeholder="Enter your password"
            required
          />
        </div>
        
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default Login