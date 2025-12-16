import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

// GET: Obtener configuración
export async function GET() {
  try {
    await dbConnect();

    let settings = await Settings.findOne();
    
    if (!settings) {
      // Crear configuración por defecto si no existe
      settings = await Settings.create({
        whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5491123456789',
        storeName: 'Bikimar',
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
      { status: 500 }
    );
  }
}

// PUT: Actualizar configuración (solo admin)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findOneAndUpdate(
        {},
        { ...body, updatedAt: new Date() },
        { new: true }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    return NextResponse.json(
      { error: 'Error al actualizar configuración' },
      { status: 500 }
    );
  }
}
