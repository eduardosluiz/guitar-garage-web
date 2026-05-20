import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const posicao = searchParams.get('posicao');

    if (!posicao) {
      return new NextResponse('Posição é obrigatória', { status: 400 });
    }

    const existingBanner = await prisma.banner.findFirst({
      where: { 
        posicao,
        isAtivo: true 
      },
      select: { id: true, titulo: true }
    });

    return NextResponse.json({ 
      exists: !!existingBanner, 
      banner: existingBanner 
    });
  } catch (error) {
    console.error('[CHECK_DUPLICATE_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
