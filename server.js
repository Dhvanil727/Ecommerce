import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
//configure env
dotenv.config();
//connect db
connectDb();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//rest object

const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);

// rest api
// app.get("/",(request,response)=>{
//     response.send("<h1>Welcome to ecommerce app</h1>"
//     //     {
//     //     message:"Welcome to my page" 
//     // }
//     )
// })

app.use('*',function(request,response){
    response.sendFile(path.join(__dirname,'./client/build/index.html'));
});
const PORT=process.env.PORT || 8080;
app.listen(PORT, ()=>{
    // console.log("Server is running on port 8080");
})


//git add -A
//git commit - m ""
//git push

