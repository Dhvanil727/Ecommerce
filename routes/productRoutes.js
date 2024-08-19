import express from "express"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { createproductcontroller, deleteproductcontroller, filterproductcontroller, getallproductscontroller, getsingleproductscontroller, productcategorycontroller, productcountcontroller, productlistcontroller, productphotocontroller, relatedproductcontroller, searchproductcontroller, updateproductcontroller } from "../controllers/productController.js";
import formidable from "express-formidable";
const router=express.Router();

router.post("/create-product",requireSignIN,isAdmin,formidable(),createproductcontroller);
router.put("/update-product/:pid",requireSignIN,isAdmin,formidable(),updateproductcontroller);
router.get("/get-products" ,getallproductscontroller);
router.get("/get-products/:slug" ,getsingleproductscontroller);
//get photo
router.get("/product-photo/:pid",productphotocontroller);
router.delete("/delete-product/:pid",deleteproductcontroller);

router.post("/product-filters", filterproductcontroller);
router.get("/product-count", productcountcontroller);
router.get("/product-list/:page",productlistcontroller);

router.get("/search/:keyword", searchproductcontroller);
router.get("/related-products/:pid/:cid",relatedproductcontroller);
router.get("/product-category/:slug",productcategorycontroller);
export default router;