import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
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
    const days = parseInt(searchParams.get('days') || '30');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    // Obtener visitas con paginación
    const visits = await Analytics.find({
      type: 'visit',
      timestamp: { $gte: dateFrom },
    }).sort({ timestamp: -1 }).skip(skip).limit(limit);

    // Total de visitas para paginación
    const totalVisitsCount = await Analytics.countDocuments({
      type: 'visit',
      timestamp: { $gte: dateFrom },
    });

    const totalPages = Math.ceil(totalVisitsCount / limit);

    // Obtener clicks en productos
    const clicks = await Analytics.find({
      type: 'click',
      timestamp: { $gte: dateFrom },
    }).populate('productId');

    // Estadísticas agregadas
    const totalVisits = await Analytics.countDocuments({
      type: 'visit',
      timestamp: { $gte: dateFrom },
    });

    const totalClicks = await Analytics.countDocuments({
      type: 'click',
      timestamp: { $gte: dateFrom },
    });

    // Visitas por país
    const visitsByCountry = await Analytics.aggregate([
      {
        $match: {
          type: 'visit',
          timestamp: { $gte: dateFrom },
        },
      },
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // IPs únicas
    const uniqueIPs = await Analytics.distinct('ip', {
      type: 'visit',
      timestamp: { $gte: dateFrom },
    });

    // Obtener analíticas agregadas (productViews y productClicks)
    const aggregatedAnalytics = await Analytics.find({
      date: { $gte: dateFrom }
    }).sort({ date: -1 });

    // Agregar vistas de productos desde los registros diarios
    const productViewsMap = new Map();
    const productClicksMap = new Map();

    for (const analytics of aggregatedAnalytics) {
      if (analytics.productViews) {
        for (const view of analytics.productViews) {
          const current = productViewsMap.get(view.productId) || 0;
          productViewsMap.set(view.productId, current + view.count);
        }
      }
      if (analytics.productClicks) {
        for (const click of analytics.productClicks) {
          const current = productClicksMap.get(click.productId) || { count: 0, name: click.productName };
          productClicksMap.set(click.productId, {
            count: current.count + click.count,
            name: click.productName
          });
        }
      }
    }

    // Convertir a arrays y obtener nombres de productos
    const productViews = [];
    for (const [productId, count] of productViewsMap.entries()) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          productViews.push({
            productId,
            productName: product.name,
            views: count
          });
        }
      } catch (e) {}
    }

    const productClicks = [];
    for (const [productId, data] of productClicksMap.entries()) {
      productClicks.push({
        productId,
        productName: data.name,
        clicks: data.count
      });
    }

    // Ordenar por cantidad
    productViews.sort((a, b) => b.views - a.views);
    productClicks.sort((a, b) => b.clicks - a.clicks);

    return NextResponse.json({
      totalVisits: totalVisitsCount,
      totalClicks,
      uniqueVisitors: uniqueIPs.length,
      visitsByCountry,
      recentVisits: visits,
      recentClicks: clicks,
      productViews: productViews.slice(0, 10), // Top 10
      productClicks: productClicks.slice(0, 10), // Top 10
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalVisitsCount,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
