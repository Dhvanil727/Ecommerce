import express from "express"
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { createcategorycontroller, deletecategorycontroller, getallactegorycontroller, getsinglecategorycontroller, updadecategorycontroller } from "../controllers/categoryController.js";

const router=express.Router();

router.post("/create-category",requireSignIN,isAdmin,  createcategorycontroller);
router.put("/update-category/:id",requireSignIN,isAdmin,updadecategorycontroller);
router.get("/get-category",getallactegorycontroller);
router.get("/single-category/:slug",getsinglecategorycontroller);
router.delete("/delete-category/:id",deletecategorycontroller);
export default router;