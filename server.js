import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
//configure env
dotenv.config();
//connect db
connectDb();
//rest object

const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

// rest api
app.get("/",(request,response)=>{
    response.send("<h1>Welcome to ecommerce app</h1>"
    //     {
    //     message:"Welcome to my page" 
    // }
    )
})
const PORT=process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Server is running on port 8080");
})


//git add -A
//git commit - m ""
//git push