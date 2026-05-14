// src/app/servicos/aulas/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AulasClient from './AulasClient';
import styles from './page.module.css';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Aulas() {
  const config = await prisma.configuracao.findFirst();
  
  // Banner de Topo (Hero)
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'aulas',
      isAtivo: true 
    }
  });

  // Imagem Interna (Professor/Ambiente)
  const internalImage = await prisma.banner.findFirst({
    where: { 
      posicao: 'imagem-aulas',
      isAtivo: true 
    }
  });

  return (
    <main className={styles.main}>
      <Header />
      <AulasClient 
        banner={banner} 
        whatsapp={config?.whatsapp || "555133313234"}
        professorImage={internalImage?.imagemUrl}
      />
      <Footer />
    </main>
  );
}
