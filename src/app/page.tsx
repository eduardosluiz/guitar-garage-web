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
  let guitars = await getProductsByCategory('guitarras');
  let basses = await getProductsByCategory('baixos');
  let acoustics = await getProductsByCategory('violoes');
  let amps = await getProductsByCategory('amps');

  // LÓGICA DE FALLBACK: Se o banco estiver vazio, mostra os exemplos de desenvolvimento
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  if (guitars.length === 0) {
    guitars = [
      { id: 101, name: 'Gretsch 6120 Nashville', brand: 'Gretsch', price: 'R$ 24.900', img: imgGtr, slug: '#' },
      { id: 102, name: 'Fender Stratocaster 1974', brand: 'Fender', price: 'R$ 18.500', img: imgGtr, slug: '#' },
      { id: 103, name: 'Gibson SG Standard', brand: 'Gibson', price: 'R$ 16.200', img: imgGtr, slug: '#' },
    ];
  }

  if (basses.length === 0) {
    basses = [
      { id: 201, name: 'Fender Precision 1978', brand: 'Fender', price: 'R$ 15.900', img: imgBass, slug: '#' },
      { id: 202, name: 'Rickenbacker 4003', brand: 'Rickenbacker', price: 'R$ 22.500', img: imgBass, slug: '#' },
      { id: 203, name: 'Music Man StingRay', brand: 'Music Man', price: 'R$ 14.200', img: imgBass, slug: '#' },
    ];
  }

  if (acoustics.length === 0) {
    acoustics = [
      { id: 301, name: 'Gibson J-45 Standard', brand: 'Gibson', price: 'R$ 19.500', img: imgGtr, slug: '#' },
      { id: 302, name: 'Martin D-28 Authentic', brand: 'Martin', price: 'R$ 32.000', img: imgGtr, slug: '#' },
      { id: 303, name: 'Taylor 814ce V-Class', brand: 'Taylor', price: 'R$ 28.900', img: imgGtr, slug: '#' },
    ];
  }

  if (amps.length === 0) {
    amps = [
      { id: 401, name: 'Vox AC30 1964 JMI', brand: 'Vox', price: 'R$ 28.000', img: imgAmp, slug: '#' },
      { id: 402, name: 'Marshall JTM45 Offset', brand: 'Marshall', price: 'R$ 32.500', img: imgAmp, slug: '#' },
      { id: 403, name: 'Fender Twin Reverb 65', brand: 'Fender', price: 'R$ 12.200', img: imgAmp, slug: '#' },
    ];
  }

  // 3. Busca imagens das categorias
  const categoriasDb = await prisma.categoria.findMany({
    select: { slug: true, imagemUrl: true }
  });
  
  const categoryImages: Record<string, string> = {};
  categoriasDb.forEach(c => {
    if (c.imagemUrl) {
      categoryImages[c.slug] = c.imagemUrl;
    }
  });

  return (
    <main className={styles.main}>
      <Header />
      
      <HomeClient 
        slides={slides}
        guitars={guitars}
        basses={basses}
        acoustics={acoustics}
        amps={amps}
        categoryImages={categoryImages}
      />

      <Footer />
    </main>
  );
}
