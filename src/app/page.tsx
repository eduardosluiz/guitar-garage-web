// src/app/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Busca Produtos em Destaque para o Carrossel
  const featuredProductsDb = await prisma.produto.findMany({
    where: {
      isDestaque: true,
      status: 'Disponivel'
    },
    include: {
      imagens: {
        orderBy: { ordem: 'asc' },
        take: 1
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  const slides = featuredProductsDb.length > 0 
    ? featuredProductsDb.map(p => ({
        id: p.id,
        title: p.nome,
        img: p.imagens[0]?.url || "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920",
        href: `/produto/${p.slug}`
      }))
    : [
        { id: 1, title: "NOVIDADES", img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920", href: "/novidades" },
        { id: 2, title: "VINTAGE", img: "https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=1920", href: "/categoria/vintage" },
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
      slug: p.slug,
      status: p.status
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
      { id: 101, name: 'Gretsch 6120 Nashville', brand: 'Gretsch', price: 'R$ 24.900', img: imgGtr, slug: '#', status: 'Disponivel' },
      { id: 102, name: 'Fender Stratocaster 1974', brand: 'Fender', price: 'R$ 18.500', img: imgGtr, slug: '#', status: 'Disponivel' },
      { id: 103, name: 'Gibson SG Standard', brand: 'Gibson', price: 'R$ 16.200', img: imgGtr, slug: '#', status: 'Disponivel' },
    ];
  }

  if (basses.length === 0) {
    basses = [
      { id: 201, name: 'Fender Precision 1978', brand: 'Fender', price: 'R$ 15.900', img: imgBass, slug: '#', status: 'Disponivel' },
      { id: 202, name: 'Rickenbacker 4003', brand: 'Rickenbacker', price: 'R$ 22.500', img: imgBass, slug: '#', status: 'Disponivel' },
      { id: 203, name: 'Music Man StingRay', brand: 'Music Man', price: 'R$ 14.200', img: imgBass, slug: '#', status: 'Disponivel' },
    ];
  }

  if (acoustics.length === 0) {
    acoustics = [
      { id: 301, name: 'Gibson J-45 Standard', brand: 'Gibson', price: 'R$ 19.500', img: imgGtr, slug: '#', status: 'Disponivel' },
      { id: 302, name: 'Martin D-28 Authentic', brand: 'Martin', price: 'R$ 32.000', img: imgGtr, slug: '#', status: 'Disponivel' },
      { id: 303, name: 'Taylor 814ce V-Class', brand: 'Taylor', price: 'R$ 28.900', img: imgGtr, slug: '#', status: 'Disponivel' },
    ];
  }

  if (amps.length === 0) {
    amps = [
      { id: 401, name: 'Vox AC30 1964 JMI', brand: 'Vox', price: 'R$ 28.000', img: imgAmp, slug: '#', status: 'Disponivel' },
      { id: 402, name: 'Marshall JTM45 Offset', brand: 'Marshall', price: 'R$ 32.500', img: imgAmp, slug: '#', status: 'Disponivel' },
      { id: 403, name: 'Fender Twin Reverb 65', brand: 'Fender', price: 'R$ 12.200', img: imgAmp, slug: '#', status: 'Disponivel' },
    ];
  }

  // 2.5 Busca Vintage The Vault (Prioriza Marcados como Destaque Vintage)
  const vintageProductsDb = await prisma.produto.findMany({
    where: { 
      condicao: 'Vintage', 
      status: 'Disponivel',
      isVintageDestaque: true
    },
    include: { imagens: { orderBy: { ordem: 'asc' }, take: 1 }, marca: true },
    orderBy: { updatedAt: 'desc' },
    take: 2
  });

  // Se não encontrar 2 marcados, busca os mais recentes da categoria vintage
  let finalVintage = [...vintageProductsDb];
  if (finalVintage.length < 2) {
    const fallbackVintage = await prisma.produto.findMany({
      where: { 
        condicao: 'Vintage', 
        status: 'Disponivel',
        id: { notIn: finalVintage.map(p => p.id) }
      },
      include: { imagens: { orderBy: { ordem: 'asc' }, take: 1 }, marca: true },
      orderBy: { createdAt: 'desc' },
      take: 2 - finalVintage.length
    });
    finalVintage = [...finalVintage, ...fallbackVintage];
  }
  
  const vintageProducts = finalVintage.map(p => ({
    id: p.id,
    name: p.nome,
    brand: p.marca?.nome || 'Guitar Garage',
    price: p.preco ? p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sob consulta',
    img: p.imagens[0]?.url || imgGtr,
    slug: p.slug,
    status: p.status
  }));

  // 3. Busca imagens das categorias
  const categoriasDb = await prisma.categoria.findMany({
    select: { slug: true, imagemUrl: true, nome: true, linkDestino: true },
    orderBy: { createdAt: 'asc' }
  });
  
  const categoryList = categoriasDb.slice(0, 6).map(c => ({
    name: c.nome,
    slug: c.slug,
    img: c.imagemUrl || imgGtr,
    linkDestino: c.linkDestino
  }));

  return (
    <main className={styles.main}>
      <Header />
      
      <HomeClient 
        slides={slides}
        guitars={guitars}
        basses={basses}
        acoustics={acoustics}
        amps={amps}
        categoryList={categoryList}
        vintageList={vintageProducts}
      />

      <Footer />
    </main>
  );
}
