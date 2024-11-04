import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "../styles/ProductDetailsStyles.css";
const ProductDetails = () => {

    const params=useParams()
    const [product,setproduct]=useState({})
    const [relatedproducts,setrelatedproducts]=useState([])

    useEffect(()=>{
        if(params.slug) getproduct();
    },[params.slug])
    const getproduct=async()=>{
        try {
            const {data}=await axios(`${process.env.REACT_APP_API}/api/v1/products/get-products/${params.slug}`)
            setproduct(data.product)
            getsimilarproducts(data.product._id,data.product.category?._id)
        } catch (error) {
            console.log(error);
        }
    }

    const getsimilarproducts=async(pid,cid)=>{
        try {
            const {data}=await axios(`${process.env.REACT_APP_API}/api/v1/products/related-products/${pid}/${cid}`);
            setrelatedproducts(data.products);
        } catch (error) {
            console.log(error);

        }
    }
  return (
    <Layout>
      <div className='row container mt-2  product-details'>
        <div className='col-md-6'> 
        <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`} className="card-img-top" alt={product.name} height="500"
            width={"350px"} />
        </div>
        <div className='col-md-6 product-details-info'>
            <h1 className='text-center'> Product Details</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            <h6>Category: {product.category?.name}</h6>
            {/* {JSON.stringify(product,null,4)} */}
            <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
        </div>
      </div>
      <hr />
 <div className='row m-3  similar-products'>
    <h1 className='text-center'>Similar products</h1>
    {relatedproducts.length <1 && <p className='text-center'>No similar products found</p>}

{/* {JSON.stringify(relatedproducts,null,4)} */}
{relatedproducts.map((p) => (
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
                  
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
 </div>
        
    </Layout>
  )
}

export default ProductDetails