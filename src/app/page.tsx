// src/app/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Busca Produtos marcados como NOVIDADES para o Carrossel Hero
  const novidadesProductsDb = await prisma.produto.findMany({
    where: {
      isNovidade: true,
      status: 'Disponivel'
    },
    include: {
      imagens: {
        orderBy: { ordem: 'asc' },
        take: 1
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 5 // Limita às 5 novidades mais recentes
  });

  const slides = novidadesProductsDb.length > 0 
    ? novidadesProductsDb.map(p => ({
        id: p.id,
        title: p.nome,
        img: p.imagens[0]?.url || "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920",
        href: `/produto/${p.slug}`
      }))
    : [
        { id: 1, title: "GUITAR GARAGE", img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920", href: "/novidades" },
        { id: 2, title: "VINTAGE COLLECTION", img: "https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=1920", href: "/categoria/vintage" },
      ];

  // Função auxiliar para buscar produtos por categoria
  async function getProductsByCategory(slug: string, limit = 3) {
    const products = await prisma.produto.findMany({
      where: {
        categoria: { slug: slug },
        status: 'Disponivel'
      },
      include: {
        marca: true,
        imagens: { orderBy: { ordem: 'asc' }, take: 1 }
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

  // 2. Busca Produtos por Categoria
  let guitars = await getProductsByCategory('guitarras');
  let basses = await getProductsByCategory('baixos');
  let acoustics = await getProductsByCategory('violoes');
  let amps = await getProductsByCategory('amps');

  // FALLBACKS para as seções não ficarem vazias na primeira visualização
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  if (guitars.length === 0) {
    guitars = [{ id: 101, name: 'Gibson Les Paul Standard', brand: 'Gibson', price: 'Sob Consulta', img: imgGtr, slug: '#', status: 'Disponivel' }];
  }
  if (basses.length === 0) {
    basses = [{ id: 201, name: 'Fender Precision Bass', brand: 'Fender', price: 'Sob Consulta', img: imgBass, slug: '#', status: 'Disponivel' }];
  }
  if (acoustics.length === 0) {
    acoustics = [{ id: 301, name: 'Martin D-28', brand: 'Martin', price: 'Sob Consulta', img: imgGtr, slug: '#', status: 'Disponivel' }];
  }
  if (amps.length === 0) {
    amps = [{ id: 401, name: 'Vox AC30 1964', brand: 'Vox', price: 'Sob Consulta', img: imgAmp, slug: '#', status: 'Disponivel' }];
  }

  // 2.5 Busca Vintage The Vault
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

  // 3. Busca imagens das categorias para o mosaico (Bento Grid)
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
    <main className={styles.main} suppressHydrationWarning>
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
