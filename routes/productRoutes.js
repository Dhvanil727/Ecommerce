import express from "express"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { createproductcontroller, getallproductscontroller } from "../controllers/productController.js";
import formidable from "express-formidable";
const router=express.Router();

router.post("/create-product",requireSignIN,isAdmin,formidable(),createproductcontroller);
router.get("/get-products" ,getallproductscontroller);

export default router;