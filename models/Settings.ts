import mongoose from 'mongoose';

export interface ISettings extends mongoose.Document {
  whatsappNumber: string;
  instagramUrl?: string;
  storeName: string;
  storeDescription?: string;
  bannerText?: string;
  heroImages?: string[];
  updatedAt: Date;
}

const SettingsSchema = new mongoose.Schema({
  whatsappNumber: {
    type: String,
    required: [true, 'Número de WhatsApp es requerido'],
    default: '5491123456789',
  },
  instagramUrl: {
    type: String,
  },
  storeName: {
    type: String,
    default: 'Bikimar',
  },
  storeDescription: {
    type: String,
  },
  bannerText: {
    type: String,
    default: '✦ Envíos a todo el país ✦ 3 cuotas sin interés ✦ Temporada 2025 ✦ Diseños únicos ✦ Bordados a mano ✦ Envíos express',
  },
  heroImages: {
    type: [String],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
