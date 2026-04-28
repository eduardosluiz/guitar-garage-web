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
  const depoimentos = await prisma.depoimento.findMany({
    where: { isAtivo: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.preTitle}>CLIENTES SATISFEITOS</span>
          <h1 className={styles.title}>
            A OPINIÃO DE<br /><span>QUEM CONFIA.</span>
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
