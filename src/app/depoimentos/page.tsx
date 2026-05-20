import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DepoimentoForm from '@/components/common/DepoimentoForm';
import DepoimentosCarousel from '@/components/common/DepoimentosCarousel';
import styles from '../sobre/page.module.css';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Depoimentos | Guitar Garage",
  description: "Veja o que nossos clientes dizem sobre suas experiências conosco.",
};

export default async function DepoimentosPage() {
  const banner = await prisma.banner.findFirst({
    where: { 
      posicao: 'depoimentos',
      isAtivo: true 
    }
  });

  const depoimentos = await prisma.depoimento.findMany({
    where: { isAtivo: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className={styles.main}>
      <Header />

      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: banner?.imagemUrl ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${banner.imagemUrl}')` : 'none',
          backgroundColor: banner?.imagemUrl ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>{banner?.preTitulo || 'CLIENTES SATISFEITOS'}</span>
          <h1 className={styles.title}>
            {banner?.titulo ? (
              <>
                {banner.titulo.split(' ').slice(0, -1).join(' ')}<br />
                <span>{banner.titulo.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>
                A OPINIÃO DE<br /><span>QUEM CONFIA.</span>
              </>
            )}
          </h1>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.textBlockFull}>
          <h2 className={styles.homeStyleTitle}>NOSSOS <span>DEPOIMENTOS</span></h2>
        </div>
        
        {depoimentos.length > 0 ? (
          <DepoimentosCarousel depoimentos={depoimentos} />
        ) : (
          <p style={{ marginTop: '2rem', color: '#777', fontSize: '1.1rem' }}>Ainda não há depoimentos cadastrados.</p>
        )}

        {/* Formulário de Envio */}
        <div style={{ maxWidth: '900px', margin: '0 auto', borderTop: '1px solid #eee', marginTop: '6rem' }}>
          <DepoimentoForm />
        </div>
      </div>

      <Footer />
    </main>
  );
}
