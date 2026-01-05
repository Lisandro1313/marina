import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { sendOrderNotification } from '@/lib/email';

// GET - Obtener todas las órdenes (solo admin)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Solo admins pueden ver todas las órdenes
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = {};
    if (status && status !== 'todas') {
      query = { status };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return NextResponse.json(
      { error: 'Error al obtener órdenes' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva orden
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { items, customer, totalAmount, notes } = body;

    // Validaciones
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El pedido debe tener al menos un producto' },
        { status: 400 }
      );
    }

    if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
      return NextResponse.json(
        { error: 'Datos del cliente incompletos' },
        { status: 400 }
      );
    }

    // Crear orden
    const order = new Order({
      items,
      customer,
      totalAmount,
      notes,
      status: 'pendiente',
    });

    await order.save();

    // Enviar email de notificación al admin
    try {
      await sendOrderNotification({
        orderNumber: order.orderNumber,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: `${customer.address}, ${customer.city}, ${customer.province}`,
        items: items.map((item: any) => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalAmount,
      });
    } catch (emailError) {
      console.error('Error al enviar email de notificación:', emailError);
      // No fallar la orden si el email falla
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error al crear orden:', error);
    return NextResponse.json(
      { error: 'Error al crear orden' },
      { status: 500 }
    );
  }
}
