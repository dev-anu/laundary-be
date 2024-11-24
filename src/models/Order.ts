import mongoose, { Schema, Document } from 'mongoose';

interface IOrderService {
  serviceId: mongoose.Types.ObjectId;
  quantity: number;
}

interface IPickupAddress {
  addressLine1: string;
  addressLine2?: string; // Optional
  city: string;
  state: string;
  zipCode: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  services: IOrderService[];
  pickupAddress: IPickupAddress;
  status: 'Pending' | 'Picked up' | 'In progress' | 'Delivered';
  totalCost: number;
  paymentStatus: 'Pending' | 'Paid';
  createdAt: Date;
  updatedAt: Date;
}

// Define the Order Schema
const orderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    services: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    pickupAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Picked up', 'In progress', 'Delivered'],
      default: 'Pending',
    },
    totalCost: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model<IOrder>('Order', orderSchema);
