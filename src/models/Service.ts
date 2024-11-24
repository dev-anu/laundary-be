import {Schema,model,Document} from "mongoose";

export interface IService extends Document{
    name:string,
    description:string,
    price:number,
    unit:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date
}

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Service = model<IService>('User', serviceSchema);