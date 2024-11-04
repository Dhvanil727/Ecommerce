import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import UserMenu from '../../components/Layouts/UserMenu'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
// const Profile = () => {
//   const [auth,setauth]=useAuth();
//   const [name, setname] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [phone, setphone] = useState("");
//   const [address, setadd] = useState(""); 

//   useEffect(()=>{
//     const {name,email,phone,address}=auth?.user;
//     setname(name);
//     setemail(email);
   
//     setphone(phone);
//     setadd(address);
//   },[auth?.user]);
//   const handlesubmit=async(e)=>{
//     e.preventDefault();
//     try {
//         const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address});
//         if(data?.error){
//           toast.error(data?.error)
//         }else{
//           setauth({...auth,user:data?.updateduser});
//           let ls =localStorage.getItem("auth");
//           ls=JSON.parse(ls);
//           ls.user=data.updateduser;
//           localStorage.setItem("auth", JSON.stringify(ls));
//           toast.success("User profile updated successfully");
//         }
//     } catch (error) {
//         console.log(error);
//         toast.error("something went wrong");
//     }
//   }
//   return (
//     <Layout title={"Dashboard - Your Profile"}>
//     <div className="container-fluid m-3 p-3">
//    <div className="row">
//              <div className="col-md-3">
             
//              <UserMenu />
//              </div>
   
//                <div className="col-md-9">
             
//                <div className="form-container" style={{ minHeight: "90vh" }}>
//         <form onSubmit={handlesubmit}>
//           <h4 className="title">USER PROFILE</h4>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputname"
//               value={name}
//               onChange={(e)=>setname( e.target.value) }
//               aria-describedby="emailHelp"
//               placeholder="Enter your name"
              
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               value={email}
//               onChange={(e)=>setemail( e.target.value) }
//               aria-describedby="emailHelp"
//               placeholder="Enter your email"
             
//               disabled
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               value={password}
//               onChange={(e)=>setpassword( e.target.value) }
//               placeholder="Enter your password"
        
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="number"
//               className="form-control"
//               id="exampleInputPhone"
//               value={phone}
//               onChange={(e)=>setphone( e.target.value) }
//               placeholder="Enter your Phone number"
             
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputAdd"
//               value={address}
//               onChange={(e)=>setadd( e.target.value) }
//               placeholder="Enter your Address"
          
//               />
//           </div>
//           <div className="mb-3">
          
//           </div>
//           <button type="submit" className="btn btn-primary">
//           UPDATE
//           </button>
//         </form>
//       </div>
               
//              </div>
//            </div>
//            </div>
//        </Layout>
//   )
// }

// export default Profile

// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await  axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address});
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;