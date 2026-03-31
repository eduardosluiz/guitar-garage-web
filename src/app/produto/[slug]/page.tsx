// src/app/produto/[slug]/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ProdutoDetalheClient from './ProdutoDetalheClient';
import styles from './page.module.css';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.produto.findUnique({
    where: { slug },
    include: { marca: true }
  });

  if (!product) return { title: 'Produto não encontrado' };

  return {
    title: `${product.nome} | Guitar Garage`,
    description: product.descricao?.substring(0, 160) || 'Detalhes do instrumento.'
  };
}

export default async function ProdutoDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const productDb = await prisma.produto.findUnique({
    where: { slug },
    include: {
      marca: true,
      imagens: {
        orderBy: { ordem: 'asc' }
      },
      categoria: true
    }
  });

  if (!productDb) {
    notFound();
  }

  // Parse especificações do JSON string ou Texto se necessário
  let extraSpecs = [];
  try {
    if (productDb.especificacoes) {
      // Se for um JSON string, parseia. Se for texto puro, talvez precise de outro tratamento.
      // Por enquanto, assumimos texto simples e podemos melhorar se houver padrão.
      const lines = productDb.especificacoes.split('\n');
      extraSpecs = lines.filter(l => l.includes(':')).map(line => {
        const [label, value] = line.split(':');
        return { label: label.trim(), value: value.trim() };
      });
    }
  } catch (e) {
    console.error("Erro ao parsear especificações", e);
  }

  const product = {
    name: productDb.nome,
    brand: productDb.marca?.nome || 'Guitar Garage',
    price: productDb.preco ? productDb.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sob consulta',
    status: productDb.status,
    year: productDb.ano?.toString(),
    condition: productDb.condicao,
    weight: productDb.peso || undefined,
    description: productDb.descricao || 'Sem descrição disponível.',
    specs: extraSpecs,
    images: productDb.imagens.map(img => ({ url: img.url }))
  };

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.container}>
        <div className={styles.backNav}>
          <Link href="/estoque" className={styles.backLink}>
            <ArrowLeft size={16} /> VOLTAR PARA O ESTOQUE
          </Link>
        </div>

        <ProdutoDetalheClient product={product} />
      </section>

      <Footer />
    </main>
  );
}
