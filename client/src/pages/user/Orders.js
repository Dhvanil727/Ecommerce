import React from 'react'
import UserMenu from '../../components/Layouts/UserMenu'
import Layout from '../../components/Layouts/Layout'

const Orders = () => {
  return (
    <Layout title={"Dashboard - Your orders"}>
    <div className="container-fluid m-3 p-3">
   <div className="row">
             <div className="col-md-3">
             
             <UserMenu/>
             </div>
   
               <div className="col-md-9">
               
               <h1>Orders</h1>
                 
               
             </div>
           </div>
           </div>
       </Layout>
  )
}

export default Orders