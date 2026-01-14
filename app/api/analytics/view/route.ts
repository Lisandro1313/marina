import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

// POST /api/analytics/view - Registrar vista de producto individual
export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID es requerido' },
        { status: 400 }
      );
    }

    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Buscar o crear registro de analytics para hoy
    let analytics = await Analytics.findOne({
      date: { $gte: today }
    });

    if (!analytics) {
      analytics = await Analytics.create({
        date: today,
        visits: 0,
        productClicks: [],
        productViews: []
      });
    }

    // Verificar si ya existe el producto en productViews
    const existingView = analytics.productViews.find(
      (view: any) => view.productId === productId
    );

    if (existingView) {
      existingView.count += 1;
    } else {
      analytics.productViews.push({
        productId,
        count: 1
      });
    }

    await analytics.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registrando vista:', error);
    return NextResponse.json(
      { error: 'Error al registrar vista' },
      { status: 500 }
    );
  }
}
