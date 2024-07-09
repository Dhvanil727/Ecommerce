import React from "react";
import {NavLink,Link} from "react-router-dom"
import { GiShoppingCart } from "react-icons/gi";
const Header = () => {
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link  to="/"  className="navbar-brand" ><GiShoppingCart  size={30}/>  Ecommerce</Link>
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item ">
        <NavLink to="/" className="nav-link" >Home </NavLink>
      </li>
      <li className="nav-item ">
        <NavLink to="/catogory" className="nav-link" >Category </NavLink>
      </li>
      <li className="nav-item">
        <NavLink  to="/register" className="nav-link" >Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  to="/login" className="nav-link ">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink  to="/cart" className="nav-link " >Cart</NavLink>
      </li>
    </ul>
    
  </div>
</nav>

  )
}

export default Header;