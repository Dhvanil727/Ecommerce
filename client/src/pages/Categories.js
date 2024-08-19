import React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All categories"}>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6" key={c._id}>
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
