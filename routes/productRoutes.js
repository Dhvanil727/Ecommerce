import express from "express"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { createproductcontroller, deleteproductcontroller, getallproductscontroller, getsingleproductscontroller, productphotocontroller, updateproductcontroller } from "../controllers/productController.js";
import formidable from "express-formidable";
const router=express.Router();

router.post("/create-product",requireSignIN,isAdmin,formidable(),createproductcontroller);
router.put("/update-product/:pid",requireSignIN,isAdmin,formidable(),updateproductcontroller);
router.get("/get-products" ,getallproductscontroller);
router.get("/get-products/:slug" ,getsingleproductscontroller);
//get photo
router.get("/product-photo/:pid",productphotocontroller);
router.delete("/delete-product/:pid",deleteproductcontroller);
export default router;