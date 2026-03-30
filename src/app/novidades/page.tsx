// src/app/novidades/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import NovidadesClient from './NovidadesClient';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novidades | Guitar Garage',
  description: 'Confira as últimas novidades em instrumentos musicais premium.',
};

export default async function NovidadesPage() {
  // Busca os produtos marcados como novidade no banco de dados
  const produtosDb = await prisma.produto.findMany({
    where: {
      isNovidade: true,
      status: 'Disponivel'
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
  const produtos = produtosDb.map(p => ({
    id: p.id,
    nome: p.nome,
    brand: p.marca?.nome || 'Guitar Garage',
    price: p.preco ? p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Sob consulta',
    img: p.imagens[0]?.url || 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800',
    slug: p.slug
  }));

  return (
    <main className={styles.main}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.preTitle}>JUST ARRIVED</span>
          <h1 className={styles.title}>
            ÚLTIMAS<br /><span>NOVIDADES</span>
          </h1>
          <p className={styles.subtitle}>Confira os instrumentos mais recentes a entrarem em nossa curadoria.</p>
        </div>
      </section>

      <NovidadesClient produtos={produtos} />

      <Footer />
    </main>
  );
}
