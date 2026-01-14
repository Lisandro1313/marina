import mongoose from 'mongoose';

export interface ISettings extends mongoose.Document {
  whatsappNumber: string;
  instagramUrl?: string;
  storeName: string;
  storeDescription?: string;
  bannerText?: string;
  heroImages?: string[];
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  footerGif?: string;
  footerTitle?: string;
  footerSubtitle?: string;
  footerDescription?: string;
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
  heroTitle: {
    type: String,
    default: 'MARINA',
  },
  heroSubtitle: {
    type: String,
    default: 'BIKINIS AUTORA',
  },
  heroDescription: {
    type: String,
    default: 'Diseños artesanales únicos\nBordados a mano con dedicación',
  },
  footerGif: {
    type: String,
    default: '/marina/Beautiful Water GIF.gif',
  },
  footerTitle: {
    type: String,
    default: 'MARINA BIKINIS',
  },
  footerSubtitle: {
    type: String,
    default: 'Diseños artesanales únicos',
  },
  footerDescription: {
    type: String,
    default: 'Bordados a mano con dedicación',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
