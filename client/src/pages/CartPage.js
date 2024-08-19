import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/Cart'
 import {  useNavigate } from 'react-router-dom'
const CartPage = () => {
    const [auth,setauth]=useAuth();
    const [cart, setCart] = useCart();
    const navigate=useNavigate();
    const totalprice=()=>{
        try {
            let total=0;
            
            cart?.map((item)=>{
                total=total+item.price
            });
            return total.toLocaleString("en-US",{
                style:"currency",
                currency:"USD"
            });
        } catch (error) {
            console.log(error)
        }
    }
    const removeItem=(pid)=>{
        try {
            let mycart=[...cart];
            let index=mycart.findIndex((item)=>item._id===pid)
            mycart.splice(index,1);
            setCart(mycart);
            localStorage.setItem("cart", JSON.stringify(mycart));
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1' >{`Hello ${auth?.token && auth.user.name}` }</h1>
                    <h4 className='text-center'>{cart.length >=1?`You have ${cart.length} items in your cart ${auth.token ? " ": "Please log in to checkout"}`:"Your cart is empty" }</h4>
                </div>
            </div> 
            <div className='row'>
                <div className='col-md-6'>
                    {cart.map(p=>(
                        <div className='row mb-2 card flex-row' >
                            <div className='col-md-4'>
                            <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                            </div>
                            <div className='col-md-8'>
                                <p>{p.name}</p>
                                <p>{p.description.substring(0,30)}</p>
                                <p>Price: {p.price}</p>
                                <button className='btn btn-danger' onClick={()=> removeItem(p._id)}>Remove </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-md-4 text-center'>
                    <h4>Cart summary</h4>
                    <p>Total | Payment | checkout</p>
                  <hr />
                  <h4>Total :{totalprice()} </h4>
                    </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage