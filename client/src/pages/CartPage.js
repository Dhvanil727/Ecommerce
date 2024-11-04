import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
const CartPage = () => {
  const [auth, setauth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setclienttoken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalprice = () => {
    try {
      let total = 0;

      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/token`
      );
      setclienttoken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post( `${process.env.REACT_APP_API}/api/v1/products/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
     <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              auth?.token && auth.user.name
            }`}</h1>
            <h4 className="text-center">
              {cart.length >= 1
                ? `You have ${cart.length} items in your cart ${
                    auth.token ? " " : "Please log in to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="container ">
        <div className="row">
        <div className="col-md-7  p-0 m-0">
            {cart.map((p) => (
              <div className="row mb-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(p._id)}
                  >
                    Remove{" "}
                  </button>
                </div>
                
              </div>
            ))}
          </div>
          <div className="col-md-5  cart-summary">
            <h4>Cart summary</h4>
            <p>Total | Payment | checkout</p>
            <hr />
            <h4>Total :{totalprice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/login", {
                        state: "/cart",
                      });
                    }}
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
