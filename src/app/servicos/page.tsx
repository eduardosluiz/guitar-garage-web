// src/app/servicos/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ServicosClient from './ServicosClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ServicosHub() {
  const banners = await prisma.banner.findMany({
    where: {
      posicao: {
        in: ['servicos-lutheria', 'servicos-pickups', 'servicos-aulas', 'servicos']
      },
      isAtivo: true
    }
  });

  const heroBanner = banners.find(b => b.posicao === 'servicos');

  const bannerMap = {
    lutheria: banners.find(b => b.posicao === 'servicos-lutheria') || null,
    pickups: banners.find(b => b.posicao === 'servicos-pickups') || null,
    aulas: banners.find(b => b.posicao === 'servicos-aulas') || null,
  };

  return (
    <main className={styles.main}>
      <Header />
      <ServicosClient banners={bannerMap} heroBanner={heroBanner} />
      <Footer />
    </main>
  );
}
