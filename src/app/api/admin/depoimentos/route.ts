// src/app/api/admin/depoimentos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.depoimento.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, texto, isAtivo } = body;

    const depoimento = await prisma.depoimento.create({
      data: { nome, email, texto, isAtivo: isAtivo !== undefined ? isAtivo : true }
    });

    return NextResponse.json(depoimento);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nome, email, texto, isAtivo } = body;

    const depoimento = await prisma.depoimento.update({
      where: { id },
      data: { nome, email, texto, isAtivo }
    });

    return NextResponse.json(depoimento);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
