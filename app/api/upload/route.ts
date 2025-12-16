import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { file } = await request.json();

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'bikimar',
      transformation: [
        { width: 800, height: 1000, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error al subir imagen' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'No se proporcionó publicId' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ message: 'Imagen eliminada' });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json(
      { error: 'Error al eliminar imagen' },
      { status: 500 }
    );
  }
}
