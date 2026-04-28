import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import styles from './page.module.css';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugs } = await params;
  const categorySlug = slugs[0];
  const brandSlug = slugs[1] || null;

  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: categorySlug,
      isAtivo: true 
    }
  });

  const category = await prisma.categoria.findUnique({
    where: { slug: categorySlug },
    include: {
      produtos: {
        where: { 
          status: { in: ['Disponivel', 'Vendido', 'Reservado'] },
          ...(brandSlug && {
            marca: {
              slug: brandSlug
            }
          })
        },
        include: { 
          imagens: { orderBy: { ordem: 'asc' }, take: 1 },
          marca: true
        }
      }
    }
  });

  let products = category?.produtos || [];

  if (categorySlug === 'vintage') {
    const vintageProducts = await prisma.produto.findMany({
      where: {
        status: { in: ['Disponivel', 'Vendido', 'Reservado'] },
        condicao: 'Vintage'
      },
      include: { 
        imagens: { orderBy: { ordem: 'asc' }, take: 1 },
        marca: true
      }
    });
    products = vintageProducts;
  }

  // LÓGICA DE FALLBACK BASEADA NO SLUG
  if (products.length === 0 && !category && categorySlug !== 'vintage') {
    const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
    const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";

    if (categorySlug === 'guitarras') {
      products = [
        { id: 3001, nome: 'Gibson ES-335 Figured', marca: { nome: 'Gibson' }, preco: 32000, slug: '#', imagens: [{ url: imgGtr }], status: 'Disponivel', createdAt: new Date() },
        { id: 3002, nome: 'Fender Telecaster 52 Reissue', marca: { nome: 'Fender' }, preco: 18900, slug: '#', imagens: [{ url: imgGtr }], status: 'Disponivel', createdAt: new Date() },
      ] as any;
    } else if (categorySlug === 'baixos') {
      products = [
        { id: 3101, nome: 'Fender Jazz Bass 1975', marca: { nome: 'Fender' }, preco: 22000, slug: '#', imagens: [{ url: imgBass }], status: 'Disponivel', createdAt: new Date() },
      ] as any;
    }
  }

  return (
    <main className={styles.main} suppressHydrationWarning>
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
          <span className={styles.preTitle}>{banner?.preTitulo || (brandSlug ? `MARCA: ${brandSlug.toUpperCase()}` : 'ESTOQUE DISPONÍVEL')}</span>
          <h1 className={styles.title}>
            {banner?.titulo ? (
              <>
                {banner.titulo.split(' ').slice(0, -1).join(' ')}<br />
                <span>{banner.titulo.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>
                {categorySlug === 'vintage' ? 'VINTAGE' : categorySlug.toUpperCase().replace(/-/g, ' ')}<br />
                <span>COLEÇÃO</span>
              </>
            )}
          </h1>
        </div>
      </section>
      <ClientPage products={products} />
      <Footer />
    </main>
  );
}
