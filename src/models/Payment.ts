import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface for the services in an order
interface IOrderService {
  serviceId: Types.ObjectId;
  quantity: number;
}

// Interface for the pickup address
interface IPickupAddress {
  addressLine1: string;
  addressLine2?: string; // Optional
  city: string;
  state: string;
  zipCode: string;
}

// Interface for the Order document
export interface IOrder extends Document {
  userId: Types.ObjectId;
  services: IOrderService[];
  pickupAddress: IPickupAddress;
  status: 'Pending' | 'Picked up' | 'In progress' | 'Delivered';
  totalCost: number;
  paymentStatus: 'Pending' | 'Paid';
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema definition for Order
const orderSchema = new Schema<IOrder>(
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
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// Exporting the model
const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
