import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connect to database");
    } catch (error) {
        console.log(error);
    }
};
export default connectDb;