import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.API_KEY!,
  api_secret: process.env.API_SECRET!,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'upload' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json({ data: uploadResult });
  } catch (err) {
    console.error('Erro no upload:', err);
    return NextResponse.json({ error: 'Erro no upload do Cloudinary' }, { status: 500 });
  }
}
