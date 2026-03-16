// src/app/api/admin/configuracoes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const config = await prisma.configuracao.findFirst();
    return NextResponse.json(config || {});
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      whatsapp, emailContato, 
      instagramUrl, showInstagram,
      facebookUrl, showFacebook,
      youtubeUrl, showYoutube,
      endereco, telefone 
    } = body;

    const config = await prisma.configuracao.upsert({
      where: { id: 1 },
      update: { 
        whatsapp, emailContato, 
        instagramUrl, showInstagram,
        facebookUrl, showFacebook,
        youtubeUrl, showYoutube,
        telefone 
      },
      create: { 
        id: 1, 
        whatsapp, emailContato, 
        instagramUrl, showInstagram,
        facebookUrl, showFacebook,
        youtubeUrl, showYoutube,
        telefone 
      },
    });

    return NextResponse.json(config);
  } catch (error) {
    console.error('[SETTINGS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
