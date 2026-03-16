// src/app/api/admin/lutheria/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const project = await prisma.projetoLutheria.delete({
      where: { id }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[LUTHERIA_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
