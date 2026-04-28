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

      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: banner ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${banner.imagemUrl}')` : 'none',
          backgroundColor: banner ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>{banner?.preTitulo || 'NOSSA HISTÓRIA'}</span>
          <h1 className={styles.title}>
            {banner?.titulo ? (
              <>
                {banner.titulo.split(' ').slice(0, -1).join(' ')}<br />
                <span>{banner.titulo.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>
                CURADORIA PARA<br /><span>O TIMBRE PERFEITO.</span>
              </>
            )}
          </h1>
        </div>
      </section>

      <ClientSobre ownerImage={ownerImage} />

      <Footer />
    </main>
  );
}
