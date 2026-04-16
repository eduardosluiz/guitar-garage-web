import React from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            {depoimentos.map(dep => (
              <div key={dep.id} style={{ backgroundColor: '#fcfcfc', padding: '2rem', border: '1px solid #eee', borderRadius: '8px' }}>
                <div style={{ color: '#D4AF37', marginBottom: '1rem', display: 'flex', gap: '4px', fontSize: '1.2rem' }}>
                  {'★'.repeat(5)}
                </div>
                <p style={{ fontStyle: 'italic', color: '#444', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '1.05rem' }}>"{dep.texto}"</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', color: '#111' }}>{dep.nome}</span>
                  {dep.email && <span style={{ fontSize: '0.8rem', color: '#888' }}>Cliente Especial</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: '2rem', color: '#777', fontSize: '1.1rem' }}>Ainda não há depoimentos cadastrados.</p>
        )}
      </div>

      <Footer />
    </main>
  );
}
