"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, ChevronDown } from 'lucide-react';
import styles from './page.module.css';

interface ClientPageProps {
  products: any[];
}

export default function ClientPage({ products }: ClientPageProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Sob Consulta';
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);
  };

  if (!isMounted) return <div className={styles.productSection}></div>;

  return (
    <>
      <section className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <button className={styles.filterBtn}><Filter size={16} /> FILTRAR</button>
          <span className={styles.count}>{products.length} INSTRUMENTOS ENCONTRADOS</span>
        </div>
        <div className={styles.filterRight}>
          <button className={styles.sortBtn}>ORDENAR POR: RECENTES <ChevronDown size={16} /></button>
        </div>
      </section>

      <section className={styles.productSection}>
        <div className={styles.grid}>
          {products.map((p, index) => (
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
                  <img src={p.imagens[0]?.url || 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800'} alt={p.nome} />
                  <div className={styles.overlay}><span>VER DETALHES</span></div>
                </div>
                <div className={styles.info}>
                  <span className={styles.brand}>{p.marca?.nome}</span>
                  <h3>{p.nome}</h3>
                  <p className={styles.price}>{formatPrice(p.preco)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
