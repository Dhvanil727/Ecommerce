import React from 'react'
import Layout from '../components/Layouts/Layout'
import { useSearch } from '../context/Search'
const Search = () => {
    const [values,setvalues]=useSearch();
  return (
    <Layout title={"Search results"}>
        <div className="container">
            <div className="text-center mt-2">
                <h1>Search results</h1>
                <h6>{values.results.length <1 ? "No products found": `Found${values.results.length}`}</h6>
                <div className="d-flex flex-wrap">
            {values.results.map((p) => (
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
            </div>
        </div>
    </Layout>
  )
}

export default Search