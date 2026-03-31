// src/app/servicos/lutheria/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { prisma } from '@/lib/prisma';
import LutheriaClient from './LutheriaClient';
import styles from './page.module.css';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Lutheria | Guitar Garage',
  description: 'Excelência técnica em restauração, regulagem e customização de instrumentos musicais.',
};

export default async function LutheriaPage() {
  // Busca os projetos de lutheria do banco de dados
  const projetosDb = await prisma.projetoLutheria.findMany({
    where: {
      isAtivo: true
    },
    include: {
      imagens: {
        orderBy: {
          id: 'asc'
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  let projetos = projetosDb.map(p => ({
    id: p.id,
    title: p.titulo,
    description: p.descricao || '',
    images: p.imagens.map(img => img.url)
  }));

  // LÓGICA DE FALLBACK
  if (projetos.length === 0) {
    projetos = [
      {
        id: 2001,
        title: 'RESTAURAÇÃO COMPLETA: GIBSON SG 1968',
        description: 'Recuperação estrutural de headstock e refino nitrocelulose original.',
        images: ['https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800']
      },
      {
        id: 2002,
        title: 'REGULAGEM PREMIUM: FENDER PRECISION BASS',
        description: 'Ajuste fino de ação, oitavas e hidratação de escala.',
        images: ['https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800']
      }
    ];
  }

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>EXCELÊNCIA TÉCNICA</span>
          <h1 className={styles.title}>
            LUTHERIA<br /><span>DE ALTA PERFORMANCE.</span>
          </h1>
        </div>
      </section>

      <LutheriaClient projetos={projetos} />

      <Footer />
    </main>
  );
}
