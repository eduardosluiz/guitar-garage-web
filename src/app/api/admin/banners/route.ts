// src/app/api/admin/banners/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: [
        { ordem: 'asc' },
        { id: 'desc' }
      ]
    });
    return NextResponse.json(banners);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, subtitulo, ctaTexto, ctaLink, imagemUrl, posicao, ordem, isAtivo } = body;

    const banner = await prisma.banner.create({
      data: {
        titulo,
        subtitulo,
        ctaTexto,
        ctaLink,
        imagemUrl,
        posicao: posicao || 'home',
        ordem: parseInt(ordem) || 0,
        isAtivo: isAtivo !== undefined ? isAtivo : true
      }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error('[BANNERS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, titulo, subtitulo, ctaTexto, ctaLink, imagemUrl, posicao, ordem, isAtivo } = body;

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        titulo,
        subtitulo,
        ctaTexto,
        ctaLink,
        imagemUrl,
        posicao: posicao || 'home',
        ordem: parseInt(ordem) || 0,
        isAtivo: isAtivo
      }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error('[BANNERS_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
