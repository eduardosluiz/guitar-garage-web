// src/app/servicos/custom-pickups/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CustomPickupsClient from './CustomPickupsClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function CustomPickups() {
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'custom-pickups',
      isAtivo: true 
    }
  });

  return (
    <main className={styles.main}>
      <Header />
      <CustomPickupsClient banner={banner} />
      <Footer />
    </main>
  );
}
