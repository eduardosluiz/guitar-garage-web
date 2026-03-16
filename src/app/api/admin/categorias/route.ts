// src/app/api/admin/categorias/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, slug } = body;

    const category = await prisma.categoria.create({
      data: { nome, slug }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORIAS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nome, slug } = body;

    const category = await prisma.categoria.update({
      where: { id },
      data: { nome, slug }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORIAS_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
