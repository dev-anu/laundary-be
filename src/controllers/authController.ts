import { Request,Response } from "express"
import { User,IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const register= async(req:Request,res:Response):Promise<void>=>{
    try{
        //take input's form req.body
        const {name,email,phone,password,address}=req.body;

        //Validation
        if(!name || !email ||!phone || !password || !address){
            res.status(400).json({message:"All field are required"});
            return;
        }
        //validation email already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User already exists"});
            return;
        }

        //encrypt password
        const hashedPassword = await bcrypt.hash(password,10);

        //Creating a new user
        const newUser:IUser = new User({
            name,email,phone,password:hashedPassword,address
        });

        await newUser.save();
        res.status(201).json({message:"User registered successfully"});
    }catch(error){
        console.error('Error in user registration: ',error);
    }
}