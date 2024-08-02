import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Modal } from "antd"
const CreateCategory = () => {
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState([]);
  const [visible, setvisible] = useState(false);
  const [selected,setselected]=useState(null);
  const [updatedname, setupdatedname]=useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getallcategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };
  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      // `${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password}
      if (data.success) {
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getallcategories();
  }, []);
  const handelupdate=async(e)=>{
    e.preventDefault();
try {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedname}
  );
  toast.success(data.message);

  setselected(null);
  setupdatedname("");
  setvisible(false);
  getallcategories();
} catch (error) {
  console.log(error);
  toast.error("something went wrong");
}
  }

  const handeldelete=async(pId)=>{
  
try {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
  );
  toast.success(data.message);

  getallcategories();
} catch (error) {
  console.log(error);
  toast.error("something went wrong");
}
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-75">
              <CategoryForm
                handlesubmit={handlesubmit}
                value={name}
                setValue={setname}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          {" "}
                          <button className="btn btn-primary ms-2" onClick={()=>{setvisible(true); setupdatedname(c.name); setselected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handeldelete(c._id)}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setvisible(false)} footer={null} visible={visible}> <CategoryForm value={updatedname} setValue={setupdatedname} handlesubmit={handelupdate}/></Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
