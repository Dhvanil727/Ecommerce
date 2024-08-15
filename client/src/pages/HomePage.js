import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";

const HomePage = () => {

  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const[total,settotal]=useState(0);
  // const[page,setpage]=useState(1);
  // const[loading,setloading]=useState(false);

  

  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data.success) {
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallcategories();
    gettotal();
  }, []);
  const getallproducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-products`
      );
      setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(!checked.length || !radio.length)
    getallproducts();
  }, [checked.length,radio.length]);
  useEffect(() => {
    if(checked.length || radio.length)
    filterproducts();
  },[checked,radio]);

  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  };

  const gettotal=async()=>{
    try {
      const {data}=await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      settotal(data.total);
      
    } catch (error) {
      console.log(error);
    }
  }


  const filterproducts=async()=>{
    try {
      const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/products/product-filters`,{checked,radio})
      setproducts(data.products)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={"Ecommerce app - Shop now"}>
      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center ">Filter by category</h4>
          <div className="d-flex flex-column m-3">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handlefilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center ">Filter by Prices</h4>
          <div className="d-flex flex-column m-3">
            <Radio.Group onChange={e=> setradio(e.target.value)}>
            {Prices.map((p)=>(
              <div  key={p._id} >

                <Radio value={p.array}>{p.name }</Radio>
              </div>
            ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column m-3" >
            <button className="btn btn-danger" onClick={()=>{
              window.location.reload();
            }}>RESET FILTER</button>
          </div>
        </div>
        <div className="col-md-9">
          
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0,30)}...</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1">More details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-3 p-2">
           {products && products.length < total && (
            <button className="btn btn-warning" onClick={(e)=>{
              e.preventDefault();
              setpage(page+1);
            }}>{loading ? "Loading..." : "Loadmore"}</button>
           )}
          </div> */}
        </div>

      </div>
    </Layout>
  );
};

export default HomePage;
