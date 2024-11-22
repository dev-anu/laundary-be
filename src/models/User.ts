import { Schema,model,Document } from "mongoose";

interface Address {
    addressLine1:string;
    addressLine2:string;
    city:string;
    state:string;
    zipCode:string
}

export interface IUser extends Document{
    name:string;
    email:string;
    phone:string;
    password:string;
    address:Address[];
    role:'customer'|'admin'|'partner';
    createdAt:Date;
    updatedAt:Date;
}

const addressSchema= new Schema<Address>({
    addressLine1:{type:String,required:true},
    addressLine2:String,
    city:{type:String,required:true},
    state:{type:String,required:true},
    zipCode:{type:String,required:true}
})

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [addressSchema],
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  export const User = model<IUser>('User', userSchema);