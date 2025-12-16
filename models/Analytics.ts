import mongoose from 'mongoose';

export interface IAnalytics extends mongoose.Document {
  type: 'visit' | 'click';
  ip?: string;
  country?: string;
  city?: string;
  userAgent?: string;
  productId?: string;
  timestamp: Date;
}

const AnalyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['visit', 'click'],
    required: true,
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
});

// Índices para consultas rápidas
AnalyticsSchema.index({ type: 1, timestamp: -1 });
AnalyticsSchema.index({ timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
