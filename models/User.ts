import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email es requerido'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password es requerido'],
    minlength: 6,
  },
  name: {
    type: String,
    required: [true, 'Nombre es requerido'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
