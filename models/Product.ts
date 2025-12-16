import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  style?: string;
  pattern?: string;
  stitching?: string;
  sizes: string[];
  colors: string[];
  stock: number;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descripción es requerida'],
  },
  price: {
    type: Number,
    required: [true, 'Precio es requerido'],
    min: 0,
  },
  images: {
    type: [String],
    required: [true, 'Al menos una imagen es requerida'],
    validate: {
      validator: function(v: string[]) {
        return v && v.length > 0;
      },
      message: 'Debe haber al menos una imagen',
    },
  },
  category: {
    type: String,
    required: [true, 'Categoría es requerida'],
    enum: ['bikini', 'enteriza', 'tankini', 'pareo', 'accesorio'],
  },
  style: {
    type: String,
    trim: true,
  },
  pattern: {
    type: String,
    trim: true,
  },
  stitching: {
    type: String,
    trim: true,
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL'],
  },
  colors: {
    type: [String],
    default: [],
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  order: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Índice para ordenamiento
ProductSchema.index({ order: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
