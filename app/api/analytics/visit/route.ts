import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Obtener información del visitante
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Intentar obtener ubicación del IP (puedes usar un servicio como ipapi.co)
    let country = 'Unknown';
    let city = 'Unknown';
    
    try {
      const geoResponse = await fetch(`https://ipapi.co/${ip.split(',')[0]}/json/`);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        country = geoData.country_name || 'Unknown';
        city = geoData.city || 'Unknown';
      }
    } catch (e) {
      // Si falla la geolocalización, continuar sin ella
    }

    await Analytics.create({
      type: 'visit',
      ip: ip.split(',')[0], // Tomar solo la primera IP si hay múltiples
      country,
      city,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al registrar visita:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
