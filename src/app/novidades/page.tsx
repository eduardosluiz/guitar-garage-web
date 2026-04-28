// src/app/novidades/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import NovidadesClient from './NovidadesClient';
import styles from './page.module.css';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Novidades | Guitar Garage',
  description: 'Confira as últimas novidades em instrumentos musicais premium.',
};

export default async function NovidadesPage() {
  // 1. Busca banner específico para novidades
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'novidades',
      isAtivo: true 
    }
  });

  // 2. Busca os produtos marcados como novidade no banco de dados
  const produtosDb = await prisma.produto.findMany({
    where: {
      isNovidade: true,
      status: { in: ['Disponivel', 'Vendido', 'Reservado'] }
    },
    include: {
      marca: true,
      imagens: {
        orderBy: {
          ordem: 'asc'
        },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 12
  });

  // Formata os dados para o componente de cliente
  let produtos = produtosDb.map(p => ({
    id: p.id,
    name: p.nome,
    brand: p.marca?.nome || 'Guitar Garage',
    price: p.preco ? p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sob consulta',
    img: p.imagens[0]?.url || 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800',
    slug: p.slug,
    status: p.status
  }));

  // LÓGICA DE FALLBACK
  if (produtos.length === 0) {
    produtos = [
      { id: 1001, name: 'Gibson Les Paul Standard 50s', brand: 'Gibson', price: 'R$ 28.500', img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800', slug: '#', status: 'Disponivel' },
      { id: 1002, name: 'Fender Stratocaster American Professional II', brand: 'Fender', price: 'R$ 16.900', img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800', slug: '#', status: 'Disponivel' },
      { id: 1003, name: 'PRS Silver Sky John Mayer', brand: 'PRS', price: 'R$ 22.000', img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800', slug: '#', status: 'Disponivel' },
      { id: 1004, name: 'Gretsch G6120 Nashville', brand: 'Gretsch', price: 'R$ 24.900', img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800', slug: '#', status: 'Vendido' },
      { id: 1005, name: 'Rickenbacker 4003 Bass', brand: 'Rickenbacker', price: 'R$ 22.500', img: 'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800', slug: '#', status: 'Disponivel' },
      { id: 1006, name: 'Vox AC30 1964 JMI', brand: 'Vox', price: 'R$ 28.000', img: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800', slug: '#', status: 'Disponivel' },
    ];
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
        <div className={styles.container}>
          <span className={styles.preTitle}>{banner?.preTitulo || 'JUST ARRIVED'}</span>
          <h1 className={styles.title}>
            {banner?.titulo ? (
              <>
                {banner.titulo.split(' ').slice(0, -1).join(' ')}<br />
                <span>{banner.titulo.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>
                ÚLTIMAS<br /><span>NOVIDADES</span>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>Confira os instrumentos mais recentes a entrarem em nossa curadoria.</p>
        </div>
      </section>

      <NovidadesClient produtos={produtos} />

      <Footer />
    </main>
  );
}
