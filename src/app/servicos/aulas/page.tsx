// src/app/servicos/aulas/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AulasClient from './AulasClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Aulas() {
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'aulas',
      isAtivo: true 
    }
  });

  return (
    <main className={styles.main}>
      <Header />
      <AulasClient banner={banner} />
      <Footer />
    </main>
  );
}
