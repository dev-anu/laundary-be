import { Request,Response } from "express"
import { User,IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


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

export const login = async(req:Request,res:Response)=>{
    try{
        //input
        const {email,password,roleType}=req.body;
        //basic validation
        if(!email || !password || !roleType){
            res.status(400).json({message:'Email,password and roleType are required'})
            return;
        }
        //check if email exist or not
        const user = await User.findOne({email});
        if(!user){
            res.send(401).json({message:"Invalid email and password"});
            return;
        }
        //check if roleType is correct or user is trying to access someone else
        if(user.role !== roleType){
            res.status(403).json({message:`User is not authorised`});
            return;
        }
        //check password is correct 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(401).json({message:'Invalid email or password'});
            return;
        }

        const token = jwt.sign({id:user._id, roleType:user.role},process.env.JWT_SECRET || 'your_jwt_secret',{expiresIn:'1h'});

        res.status(200).json({message:"Login Successful",
        token,
        user:{id:user._id,name:user.name,email:user.email,roleType:user.role}})

    }catch(error){
        console.error('Error in user login: ',error);
    }
}