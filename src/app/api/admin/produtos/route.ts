// src/app/api/admin/produtos/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      nome, slug, preco, descricao, peso, ano, condicao, status, 
      isDestaque, isNovidade, marcaId, categoriaId, images 
    } = body;

    const parsePrice = (val: any) => {
      if (!val) return null;
      // Se vier como string "10.000,00", removemos o ponto e trocamos a vírgula por ponto
      const cleaned = val.toString().replace(/\./g, '').replace(',', '.');
      return parseFloat(cleaned);
    };

    const product = await prisma.produto.create({
      data: {
        nome,
        slug,
        preco: parsePrice(preco),
        descricao,
        peso,
        ano: ano ? parseInt(ano) : null,
        condicao,
        status,
        isDestaque,
        isNovidade,
        especificacoes: JSON.stringify(body.especificacoes || {}),
        marcaId: marcaId ? parseInt(marcaId) : null,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        imagens: {
          create: images.map((img: any) => ({ 
            url: img.url,
            ordem: img.ordem || 0
          }))
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUTOS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { 
      id, nome, slug, preco, descricao, peso, ano, condicao, status, 
      isDestaque, isNovidade, marcaId, categoriaId, images 
    } = body;

    // Primeiro, deletar imagens antigas (ou fazer um sync mais inteligente)
    await prisma.imagem.deleteMany({
      where: { produtoId: id }
    });

    const parsePrice = (val: any) => {
      if (!val) return null;
      const cleaned = val.toString().replace(/\./g, '').replace(',', '.');
      return parseFloat(cleaned);
    };

    const product = await prisma.produto.update({
      where: { id },
      data: {
        nome,
        slug,
        preco: parsePrice(preco),
        descricao,
        peso,
        ano: ano ? parseInt(ano) : null,
        condicao,
        status,
        isDestaque,
        isNovidade,
        especificacoes: JSON.stringify(body.especificacoes || {}),
        marcaId: marcaId ? parseInt(marcaId) : null,
        categoriaId: categoriaId ? parseInt(categoriaId) : null,
        imagens: {
          create: images.map((img: any) => ({ 
            url: img.url,
            ordem: img.ordem || 0
          }))
        }
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('[PRODUTOS_PUT]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
