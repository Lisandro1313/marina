import mongoose from 'mongoose';

export interface IAnalytics extends mongoose.Document {
  type: 'visit' | 'click';
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  productId?: string;
  timestamp: Date;
  date?: Date;
  visits?: number;
  productClicks?: Array<{ productId: string; productName: string; count: number }>;
  productViews?: Array<{ productId: string; count: number }>;
}

const AnalyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['visit', 'click'],
  },
  ip: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Campos para analytics diarias
  date: {
    type: Date,
  },
  visits: {
    type: Number,
    default: 0,
  },
  productClicks: [{
    productId: String,
    productName: String,
    count: { type: Number, default: 0 }
  }],
  productViews: [{
    productId: String,
    count: { type: Number, default: 0 }
  }],
});

// Índices para consultas rápidas
AnalyticsSchema.index({ type: 1, timestamp: -1 });
AnalyticsSchema.index({ timestamp: -1 });
AnalyticsSchema.index({ date: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
