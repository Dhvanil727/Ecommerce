import React from 'react'
import Layout from '../components/Layouts/Layout'

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
        
<h1>Privacy Policy</h1>
<p><b>Data Collection and Usage:</b> We collect personal information like name, email, and payment details to process orders and provide services.</p>
<p><b>Cookies:</b> We use cookies to enhance your experience. You can manage cookie preferences through your browser settings.</p>
<p><b>Data Security:</b> We use SSL technology and other security measures to protect your information.</p>
<p><b>Third-Party Services:</b> We may share information with trusted third parties for payment processing and shipping.</p>
<p><b>User Rights:</b> You can access, update, or delete your personal information and opt-out of marketing communications.</p>
<p><b>Policy Updates:</b> We may update this policy and will notify you of any changes on this page.</p>
        </div>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy