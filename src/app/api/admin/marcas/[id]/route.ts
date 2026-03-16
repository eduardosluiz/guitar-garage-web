// src/app/api/admin/marcas/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const brand = await prisma.marca.delete({
      where: { id }
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('[MARCA_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
