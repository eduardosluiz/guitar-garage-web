import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname; // Ex: /uploads/categorias/1_logo.png
    
    // Removemos o '/uploads/' do inicio para pegar apenas o caminho interno
    const relativePath = pathname.substring('/uploads/'.length);
    
    // Montamos o caminho absoluto onde o volume do Docker está salvando
    const filePath = join(process.cwd(), 'public', 'uploads', relativePath);
    
    if (!existsSync(filePath)) {
      return new NextResponse('Arquivo não encontrado no Volume', { status: 404 });
    }

    const file = await readFile(filePath);
    
    let contentType = 'application/octet-stream';
    if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filePath.endsWith('.webp')) contentType = 'image/webp';
    else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (filePath.endsWith('.mp3')) contentType = 'audio/mpeg';
    else if (filePath.endsWith('.wav')) contentType = 'audio/wav';
    else if (filePath.endsWith('.mp4')) contentType = 'video/mp4';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Erro ao ler arquivo do volume:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
