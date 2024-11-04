import React from 'react'
import Layout from '../components/Layouts/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
         
Welcome to my Ecommerce , your ultimate destination for all essentials products. We are passionate about bringing innovation and reliability to your fingertips, catering to both everyday needs . Here, we pride ourselves on being a trusted provider of a wide array of different types of products, including cutting-edge components, accessories, and devices. Our extensive inventory encompasses everything from mobile accessories and computer peripherals to advanced smart home gadgets and professional-grade networking equipment.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About