import { Schema,model,Document } from "mongoose";

export interface IUser extends Document{
    name:string;
    email:string;
    phone:string;
    password:string;
    address:string;
    role:'customer'|'admin'|'partner';
    createdAt:Date;
    updatedAt:Date;
}


const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String},
    role: { type: String, enum: ['customer', 'admin','partner'], default: 'customer' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const User = model<IUser>('User', userSchema);