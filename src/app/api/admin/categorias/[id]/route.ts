// src/app/api/admin/categorias/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const category = await prisma.categoria.delete({
      where: { id }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('[CATEGORIA_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
