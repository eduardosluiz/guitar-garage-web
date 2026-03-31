import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import styles from './page.module.css';
import ClientSobre from './ClientSobre';

export const dynamic = 'force-dynamic';

export default async function Sobre() {
  // Buscar imagem de destaque para a página sobre (posicao: sobre)
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'sobre',
      isAtivo: true 
    }
  });

  const ownerImage = banner?.imagemUrl || '/solonfishbone.jpg';

  return (
    <main className={styles.main}>
      <Header />

      {/* HERO INSTITUCIONAL */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>NOSSA HISTÓRIA</span>
          <h1 className={styles.title}>
            CURADORIA PARA<br /><span>O TIMBRE PERFEITO.</span>
          </h1>
        </div>
      </section>

      <ClientSobre ownerImage={ownerImage} />

      <Footer />
    </main>
  );
}
