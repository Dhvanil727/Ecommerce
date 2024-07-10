import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import "../../styles/Authstyles.css";
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate,useLocation} from "react-router-dom"
import { useAuth } from "../../context/auth";
const Login = () => {
    const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth,setauth]=useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try {
        const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});
        if(res.data.success){
            toast.success(res.data.message);
            setauth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data))
            navigate( location.state || "/");
        }else{
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
  }
  return (
    <Layout title={"Login"}>
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
        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password");
          
        }}>
          Forgot Password
        </button>
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