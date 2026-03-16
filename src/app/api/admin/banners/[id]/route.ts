// src/app/api/admin/banners/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    const banner = await prisma.banner.delete({
      where: { id }
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error('[BANNER_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
