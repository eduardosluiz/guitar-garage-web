"use client";

import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const CATEGORIES = [
  { name: 'GUITARRAS', slug: 'guitarras', img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800' },
  { name: 'BAIXOS', slug: 'baixos', img: 'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800' },
  { name: 'AMPS', slug: 'amps', img: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800' },
  { name: 'VIOLÕES', slug: 'violoes', img: 'https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=800' },
  { name: 'PEDAIS', slug: 'pedais', img: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=800' },
  { name: 'CUSTOM SHOP', slug: 'custom-shop', img: 'https://images.unsplash.com/photo-1564186763535-ebb21ef52784?q=80&w=800' }
];

export default function Estoque() {
  return (
    <main className={styles.main}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>INVENTÁRIO</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.title}>
            EXPLORE NOSSO<br /><span>ESTOQUE PREMIUM</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {CATEGORIES.map((cat, index) => (
              <Link key={cat.slug} href={`/categoria/${cat.slug}`} className={styles.card}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={styles.cardInner}
                >
                  <div className={styles.imgWrapper}>
                    <img src={cat.img} alt={cat.name} />
                    <div className={styles.overlay}></div>
                  </div>
                  <div className={styles.content}>
                    <h3>{cat.name}</h3>
                    <span className={styles.linkText}>VER COLEÇÃO <ArrowRight size={16} /></span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
