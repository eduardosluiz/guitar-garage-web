// src/app/novidades/NovidadesClient.tsx
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './page.module.css';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  img: string;
  slug: string;
  status: string;
}

export default function NovidadesClient({ produtos }: { produtos: Product[] }) {
  return (
    <section className={styles.productsSection}>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {produtos.map((p, index) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/produto/${p.slug}`} className={styles.productCard}>
                <div className={styles.imgWrapper}>
                  <img src={p.img} alt={p.name} />
                  {p.status === 'Vendido' && <div className={styles.soldBadge}>VENDIDO</div>}
                  <span className={styles.tag}>NEW</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.brand}>{p.brand}</span>
                  <h3>{p.name}</h3>
                  <div className={styles.footer}>
                    <span className={styles.price}>{p.status === 'Vendido' ? 'Vendido' : p.price}</span>
                    <span className={styles.viewLink}>VER DETALHES <ArrowUpRight size={14} /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {produtos.length === 0 && (
          <div className={styles.noProducts}>
            <p>Nenhuma novidade disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
