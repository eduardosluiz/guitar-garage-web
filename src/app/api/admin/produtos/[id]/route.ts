// src/app/api/admin/produtos/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const product = await prisma.produto.delete({
      where: { id }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUTO_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
