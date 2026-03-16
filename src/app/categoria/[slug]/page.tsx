"use client";

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Link from 'next/link';
import { Filter, ChevronDown, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug as string;

  // URLs QUE FUNCIONAM
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  // Dados simulados com imagens repetidas estáveis
  const allProducts = [
    { id: 1, name: 'Gretsch 6120 Nashville', brand: 'Gretsch', price: 'R$ 24.900', img: imgGtr, slug: 'gretsch-6120' },
    { id: 2, name: 'Fender Stratocaster 1974', brand: 'Fender', price: 'R$ 18.500', img: imgGtr, slug: 'fender-strat-74' },
    { id: 3, name: 'Gibson SG Standard', brand: 'Gibson', price: 'R$ 16.200', img: imgGtr, slug: 'gibson-sg' },
    { id: 4, name: 'PRS CE 24 Blue Matteo', brand: 'PRS', price: 'R$ 21.000', img: imgGtr, slug: 'prs-ce-24' },
    { id: 5, name: 'Fender Precision 1978', brand: 'Fender', price: 'R$ 15.900', img: imgBass, slug: 'fender-pbass-78' },
    { id: 6, name: 'Rickenbacker 4003', brand: 'Rickenbacker', price: 'R$ 22.500', img: imgBass, slug: 'rick-4003' },
  ];

  const categoryName = slug.toUpperCase().replace(/-/g, ' ');

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>ESTOQUE DISPONÍVEL</motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.title}
          >
            {categoryName}<br /><span>COLEÇÃO</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <button className={styles.filterBtn}><Filter size={16} /> FILTRAR</button>
          <span className={styles.count}>{allProducts.length} INSTRUMENTOS ENCONTRADOS</span>
        </div>
        <div className={styles.filterRight}>
          <button className={styles.sortBtn}>ORDENAR POR: RECENTES <ChevronDown size={16} /></button>
        </div>
      </section>

      <section className={styles.productSection}>
        <div className={styles.grid}>
          {allProducts.map((p, index) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className={styles.productCard}
            >
              <Link href={`/produto/${p.slug}`} className={styles.cardLink}>
                <div className={styles.imageBox}>
                  <img src={p.img} alt={p.name} />
                  <div className={styles.overlay}><span>VER DETALHES</span></div>
                </div>
                <div className={styles.info}>
                  <span className={styles.brand}>{p.brand}</span>
                  <h3>{p.name}</h3>
                  <p className={styles.price}>{p.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
