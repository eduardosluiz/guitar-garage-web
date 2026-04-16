import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import styles from './page.module.css';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugs } = await params;
  
  // O slugs será um array: ['guitarras'] ou ['guitarras', 'fender']
  const categorySlug = slugs[0];
  const brandSlug = slugs[1] || null;

  // 1. Buscar banner específico para esta categoria
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: categorySlug,
      isAtivo: true 
    }
  });

  // 2. Buscar produtos da categoria, filtrando por marca se houver
  const category = await prisma.categoria.findUnique({
    where: { slug: categorySlug },
    include: {
      produtos: {
        where: { 
          status: 'Disponivel',
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

  let categoryName = categorySlug.toUpperCase().replace(/-/g, ' ');
  if (brandSlug) {
    categoryName = `${brandSlug.toUpperCase().replace(/-/g, ' ')} | ${categoryName}`;
  }

  let products = category?.produtos || [];

  if (categorySlug === 'vintage') {
    const vintageProducts = await prisma.produto.findMany({
      where: {
        status: 'Disponivel',
        condicao: 'Vintage'
      },
      include: { 
        imagens: { orderBy: { ordem: 'asc' }, take: 1 },
        marca: true
      }
    });
    products = vintageProducts;
    categoryName = 'COLEÇÃO VINTAGE';
  }

  // LÓGICA DE FALLBACK BASEADA NO SLUG (Apenas se o banco estiver vazio)
  if (products.length === 0 && !category && categorySlug !== 'vintage') {
    const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
    const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
    const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

    if (categorySlug === 'guitarras') {
      products = [
        { id: 3001, nome: 'Gibson ES-335 Figured', marca: { nome: 'Gibson' }, preco: 32000, slug: '#', imagens: [{ url: imgGtr }] },
        { id: 3002, nome: 'Fender Telecaster 52 Reissue', marca: { nome: 'Fender' }, preco: 18900, slug: '#', imagens: [{ url: imgGtr }] },
        { id: 3003, nome: 'Gibson SG Standard', marca: { nome: 'Gibson' }, preco: 16200, slug: '#', imagens: [{ url: imgGtr }] },
        { id: 3004, nome: 'Gretsch 6120 Nashville', marca: { nome: 'Gretsch' }, preco: 24900, slug: '#', imagens: [{ url: imgGtr }] },
        { id: 3005, nome: 'PRS CE 24 Blue Matteo', marca: { nome: 'PRS' }, preco: 21000, slug: '#', imagens: [{ url: imgGtr }] },
        { id: 3006, nome: 'Fender Stratocaster 1974', marca: { nome: 'Fender' }, preco: 18500, slug: '#', imagens: [{ url: imgGtr }] },
      ] as any;
    } else if (categorySlug === 'baixos') {
      products = [
        { id: 3101, nome: 'Fender Jazz Bass 1975', marca: { nome: 'Fender' }, preco: 22000, slug: '#', imagens: [{ url: imgBass }] },
        { id: 3102, nome: 'Hofner 500/1 Violin Bass', marca: { nome: 'Hofner' }, preco: 15500, slug: '#', imagens: [{ url: imgBass }] },
        { id: 3103, nome: 'Rickenbacker 4003', marca: { nome: 'Rickenbacker' }, preco: 22500, slug: '#', imagens: [{ url: imgBass }] },
        { id: 3104, nome: 'Fender Precision 1978', marca: { nome: 'Fender' }, preco: 15900, slug: '#', imagens: [{ url: imgBass }] },
        { id: 3105, nome: 'Music Man StingRay', marca: { nome: 'Music Man' }, preco: 14200, slug: '#', imagens: [{ url: imgBass }] },
        { id: 3106, nome: 'Gibson Thunderbird', marca: { nome: 'Gibson' }, preco: 19800, slug: '#', imagens: [{ url: imgBass }] },
      ] as any;
    } else if (categorySlug === 'amps') {
      products = [
        { id: 3201, nome: 'Fender Deluxe Reverb 65', marca: { nome: 'Fender' }, preco: 14500, slug: '#', imagens: [{ url: imgAmp }] },
        { id: 3202, nome: 'Marshall Bluesbreaker', marca: { nome: 'Marshall' }, preco: 24000, slug: '#', imagens: [{ url: imgAmp }] },
        { id: 3203, nome: 'Vox AC30 1964 JMI', marca: { nome: 'Vox' }, preco: 28000, slug: '#', imagens: [{ url: imgAmp }] },
        { id: 3204, nome: 'Marshall JTM45 Offset', marca: { nome: 'Marshall' }, preco: 32500, slug: '#', imagens: [{ url: imgAmp }] },
        { id: 3205, nome: 'Fender Twin Reverb', marca: { nome: 'Fender' }, preco: 12200, slug: '#', imagens: [{ url: imgAmp }] },
        { id: 3206, nome: 'Orange AD30 Combo', marca: { nome: 'Orange' }, preco: 9800, slug: '#', imagens: [{ url: imgAmp }] },
      ] as any;
    }
  }

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
          <span className={styles.preTitle}>
            {brandSlug ? `MARCA: ${brandSlug.toUpperCase()}` : 'ESTOQUE DISPONÍVEL'}
          </span>
          <h1 className={styles.title}>
            {categorySlug === 'vintage' ? 'VINTAGE' : categorySlug.toUpperCase().replace(/-/g, ' ')}<br /><span>COLEÇÃO</span>
          </h1>
        </div>
      </section>

      <ClientPage products={products} />

      <Footer />
    </main>
  );
}
