// src/app/api/admin/marcas/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, slug, logo_url } = body;

    const brand = await prisma.marca.create({
      data: { nome, slug, logo_url }
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('[MARCAS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nome, slug, logo_url } = body;

    const brand = await prisma.marca.update({
      where: { id },
      data: { nome, slug, logo_url }
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('[MARCAS_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
