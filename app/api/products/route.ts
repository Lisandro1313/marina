import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET: Obtener todos los productos o uno por ID
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { error: 'Producto no encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    const filter = activeOnly ? { active: true } : {};
    const products = await Product.find(filter).sort({ order: 1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

// POST: Crear un nuevo producto (solo admin)
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

    const body = await request.json();
    
    // Obtener el último order para agregar al final
    const lastProduct = await Product.findOne().sort({ order: -1 });
    const newOrder = lastProduct ? lastProduct.order + 1 : 0;

    const product = await Product.create({
      ...body,
      order: newOrder,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error al crear producto';
    console.error('Error al crear producto:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT: Actualizar un producto (solo admin)
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    const product = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error al actualizar producto';
    console.error('Error al actualizar producto:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar un producto (solo admin)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID requerido' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
