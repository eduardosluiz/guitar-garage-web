// src/app/estoque/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import EstoqueClient from './EstoqueClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Estoque() {
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'estoque',
      isAtivo: true 
    }
  });

  return (
    <main className={styles.main}>
      <Header />
      <EstoqueClient banner={banner} />
      <Footer />
    </main>
  );
}
