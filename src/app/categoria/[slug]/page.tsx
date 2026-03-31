import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import styles from './page.module.css';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Buscar banner específico para esta categoria
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: slug,
      isAtivo: true 
    }
  });

  // 2. Buscar produtos da categoria
  const category = await prisma.categoria.findUnique({
    where: { slug },
    include: {
      produtos: {
        where: { status: 'Disponivel' },
        include: { 
          imagens: { orderBy: { ordem: 'asc' }, take: 1 },
          marca: true
        }
      }
    }
  });

  const categoryName = slug.toUpperCase().replace(/-/g, ' ');
  const products = category?.produtos || [];

  return (
    <main className={styles.main}>
      <Header />

      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: banner ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${banner.imagemUrl}')` : 'none',
          backgroundColor: banner ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>ESTOQUE DISPONÍVEL</span>
          <h1 className={styles.title}>
            {categoryName}<br /><span>COLEÇÃO</span>
          </h1>
        </div>
      </section>

      <ClientPage products={products} />

      <Footer />
    </main>
  );
}
