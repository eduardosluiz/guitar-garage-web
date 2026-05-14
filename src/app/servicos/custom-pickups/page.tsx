// src/app/servicos/custom-pickups/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CustomPickupsClient from './CustomPickupsClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function CustomPickups() {
  const banners = await prisma.banner.findMany({
    where: { 
      posicao: {
        in: [
          'custom-pickups', 
          'card-two-tone', 'card-three-tone', 'card-buttertone',
          'two-tone', 'three-tone', 'buttertone'
        ]
      },
      isAtivo: true 
    },
    include: { media: true },
    orderBy: { id: 'asc' }
  });

  // Mapa para acesso rápido, priorizando cards específicos e o registro mais recente
  const bannerMap = banners.reduce((acc: any, b) => {
    const pos = b.posicao;
    // Se não temos nada para essa posição, ou se esse banner é um card (que tem prioridade)
    // ou se esse banner tem um ID maior (mais recente) que o que já temos
    if (!acc[pos] || (pos.startsWith('card-') && !acc[pos].posicao.startsWith('card-')) || b.id > acc[pos].id) {
      acc[pos] = b;
    }
    return acc;
  }, {});

  // Coletar todos os samples de áudio reais cadastrados
  const realSamples = banners.flatMap(b => 
    b.media
      .filter(m => m.tipo === 'audio')
      .map(m => b.titulo || "Sample")
  );

  return (
    <main className={styles.main}>
      <Header />
      <CustomPickupsClient 
        banner={bannerMap['custom-pickups']} 
        toneBanners={bannerMap} 
        dynamicSamples={realSamples.length > 0 ? realSamples : undefined}
      />
      <Footer />
    </main>
  );
}
