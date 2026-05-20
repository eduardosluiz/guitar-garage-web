// src/app/api/admin/banners/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      include: { media: true },
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
    const { preTitulo, titulo, subtitulo, ctaTexto, ctaLink, imagemUrl, posicao, ordem, isAtivo, media } = body;

    if (!imagemUrl && (!media || media.length === 0)) {
      return new NextResponse('Imagem é obrigatória', { status: 400 });
    }

    const banner = await prisma.banner.create({
      data: {
        preTitulo: preTitulo || '',
        titulo: titulo || '',
        subtitulo: subtitulo || '',
        ctaTexto: ctaTexto || '',
        ctaLink: ctaLink || '',
        imagemUrl: imagemUrl || (media && media[0]?.url) || '',
        posicao: posicao || 'home',
        ordem: parseInt(ordem?.toString()) || 0,
        isAtivo: isAtivo !== undefined ? isAtivo : true,
        media: {
          create: (media || []).map((item: any) => ({
            url: item.url || '',
            tipo: (item.url?.endsWith('.mp3') || item.url?.endsWith('.wav') || item.url?.endsWith('.ogg') || (item.url?.includes('/video/upload/') && !item.url?.endsWith('.mp4'))) ? 'audio' : 'imagem',
            ordem: parseInt(item.ordem?.toString()) || 0
          }))
        }
      }
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    console.error('[BANNERS_POST]', error);
    return new NextResponse(`Erro ao criar banner: ${error.message || 'Erro Interno'}`, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, preTitulo, titulo, subtitulo, ctaTexto, ctaLink, imagemUrl, posicao, ordem, isAtivo, media } = body;

    if (!id) {
      return new NextResponse('ID é obrigatório', { status: 400 });
    }

    const banner = await prisma.banner.update({
      where: { id: parseInt(id.toString()) },
      data: {
        preTitulo: preTitulo || '',
        titulo: titulo || '',
        subtitulo: subtitulo || '',
        ctaTexto: ctaTexto || '',
        ctaLink: ctaLink || '',
        imagemUrl: imagemUrl || (media && media[0]?.url) || '',
        posicao: posicao || 'home',
        ordem: parseInt(ordem?.toString()) || 0,
        isAtivo: isAtivo,
        media: {
          deleteMany: {},
          create: (media || []).map((item: any) => ({
            url: item.url || '',
            tipo: (item.url?.endsWith('.mp3') || item.url?.endsWith('.wav') || item.url?.endsWith('.ogg') || (item.url?.includes('/video/upload/') && !item.url?.endsWith('.mp4'))) ? 'audio' : 'imagem',
            ordem: parseInt(item.ordem?.toString()) || 0
          }))
        }
      }
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    console.error('[BANNERS_PUT]', error);
    return new NextResponse(`Erro ao atualizar banner: ${error.message || 'Erro Interno'}`, { status: 500 });
  }
}
