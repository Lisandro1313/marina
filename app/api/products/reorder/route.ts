import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// POST: Reordenar productos
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { productIds } = await request.json();

    if (!Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'productIds debe ser un array' },
        { status: 400 }
      );
    }

    // Actualizar el order de cada producto
    const updatePromises = productIds.map((id, index) =>
      Product.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Orden actualizado' });
  } catch (error) {
    console.error('Error al reordenar productos:', error);
    return NextResponse.json(
      { error: 'Error al reordenar productos' },
      { status: 500 }
    );
  }
}
