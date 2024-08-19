import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export const CategoryProduct = () => {
    const [category,setcategory]=useState([]);
    const [products,setproducts]=useState([]);
    const params=useParams();
    const navigate=useNavigate()
    const getproductsbycat=async()=>{
        try {
            const {data}=await axios(`${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`)
            setproducts(data.products);
            setcategory(data.category)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getproductsbycat();
    },[])
  return (
    <Layout>
        <div className='container mt-3'> 
<h4 className='text-center'>Category: { category.name}</h4>
<h6 className='text-center'>Found {products.length} products</h6>
<div className="row">
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
                  <button className="btn btn-primary ms-1" onClick={()=>{
                    navigate(`/product/${p.slug}`)
                  }}>More details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
</div>
        </div>
    </Layout>
  )
}
