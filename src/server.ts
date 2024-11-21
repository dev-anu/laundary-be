import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

//database setup
const connectDB = async()=>{
    try{
        const mongoURI= process.env.MONGO_URI || 'mongodb://localhost:27017/laundary-app';
        await mongoose.connect(mongoURI);
    }catch(err){
        console.error('Error connection to MongoDB:',err);
        process.exit(1);
    }
}


const PORT = process.env.PORT || 5000;
connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
})