import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { productId } = body;

    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    await Analytics.create({
      type: 'click',
      ip: ip.split(',')[0],
      productId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al registrar click:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
