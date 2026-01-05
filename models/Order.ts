import mongoose from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size: string;
}

export interface IOrder extends mongoose.Document {
  orderNumber: string;
  items: IOrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode?: string;
  };
  totalAmount: number;
  status: 'pendiente' | 'preparando' | 'enviado' | 'entregado' | 'cancelado';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String, required: true },
  productImage: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true, enum: ['S', 'M', 'L', 'XL'] },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [orderItemSchema],
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pendiente', 'preparando', 'enviado', 'entregado', 'cancelado'],
      default: 'pendiente',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Generar número de orden automático
orderSchema.pre('save', async function (next) {
  if (this.isNew && !this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `BK${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default Order;
