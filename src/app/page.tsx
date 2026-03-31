// src/app/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Busca Banners da Home
  const bannersDb = await prisma.banner.findMany({
    where: {
      posicao: 'home',
      isAtivo: true
    },
    orderBy: {
      ordem: 'asc'
    }
  });

  const slides = bannersDb.length > 0 
    ? bannersDb.map(b => ({
        id: b.id,
        title: b.titulo || 'Guitar Garage',
        img: b.imagemUrl,
        href: b.ctaLink || '/estoque'
      }))
    : [
        { id: 1, title: "NOVIDADES", img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920", href: "/novidades" },
        { id: 2, title: "RELÍQUIAS", img: "https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=1920", href: "/categoria/reliquias" },
      ];

  // Função auxiliar para buscar produtos por categoria
  async function getProductsByCategory(slug: string, limit = 3) {
    const products = await prisma.produto.findMany({
      where: {
        categoria: {
          slug: slug
        },
        status: 'Disponivel'
      },
      include: {
        marca: true,
        imagens: {
          orderBy: { ordem: 'asc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });

    return products.map(p => ({
      id: p.id,
      name: p.nome,
      brand: p.marca?.nome || 'Guitar Garage',
      price: p.preco ? p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sob consulta',
      img: p.imagens[0]?.url || 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800',
      slug: p.slug
    }));
  }

  // 2. Busca Produtos por Categoria para as seções da Home
  const guitars = await getProductsByCategory('guitarras');
  const basses = await getProductsByCategory('baixos');
  const acoustics = await getProductsByCategory('violoes');
  const amps = await getProductsByCategory('amps');

  return (
    <main className={styles.main}>
      <Header />
      
      <HomeClient 
        slides={slides}
        guitars={guitars}
        basses={basses}
        acoustics={acoustics}
        amps={amps}
      />

      <Footer />
    </main>
  );
}
