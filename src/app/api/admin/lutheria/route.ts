// src/app/api/admin/lutheria/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, slug, descricao, videoUrl, isAtivo, images } = body;

    const project = await prisma.projetoLutheria.create({
      data: {
        titulo,
        slug,
        descricao,
        videoUrl,
        isAtivo: isAtivo !== undefined ? isAtivo : true,
        imagens: {
          create: images.map((img: any) => ({ 
            url: img.url,
            ordem: img.ordem || 0
          }))
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[LUTHERIA_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, titulo, slug, descricao, videoUrl, isAtivo, images } = body;

    // Sincronizar imagens
    await prisma.imagemProjeto.deleteMany({
      where: { projetoId: id }
    });

    const project = await prisma.projetoLutheria.update({
      where: { id },
      data: {
        titulo,
        slug,
        descricao,
        videoUrl,
        isAtivo,
        imagens: {
          create: images.map((img: any) => ({ 
            url: img.url,
            ordem: img.ordem || 0
          }))
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[LUTHERIA_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
