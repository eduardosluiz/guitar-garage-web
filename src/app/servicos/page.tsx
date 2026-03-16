"use client";

import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Wrench, GraduationCap, Mic2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ServicosHub() {
  const services = [
    {
      title: "LUTHERIA ESPECIALIZADA",
      description: "Excelência técnica no trato com instrumentos de alto valor e relíquias históricas.",
      icon: <Wrench size={32} />,
      img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800",
      href: "/servicos/lutheria"
    },
    {
      title: "GG CUSTOM PICKUPS",
      description: "Enrolamento manual de captadores para recriar o timbre clássico das décadas de 50 e 60.",
      icon: <Mic2 size={32} />,
      img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800",
      href: "/servicos/custom-pickups"
    },
    {
      title: "AULAS DE MÚSICA",
      description: "Mentoria personalizada imersiva em um ambiente cercado pelos melhores instrumentos do mundo.",
      icon: <GraduationCap size={32} />,
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      href: "/servicos/aulas"
    }
  ];

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.preTitle}
          >
            SOLUÇÕES MUSICAIS
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            MAIS QUE UMA LOJA,<br /><span>UM CENTRO DE TIMBRE.</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.servicesGrid}>
        {services.map((service, index) => (
          <motion.div 
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={styles.serviceCard}
          >
            <div className={styles.cardImage}>
              <img src={service.img} alt={service.title} />
              <div className={styles.iconOverlay}>{service.icon}</div>
            </div>
            <div className={styles.cardContent}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href={service.href} className={styles.magneticBtn}>
                VER DETALHES <ArrowRight size={16}/>
              </Link>
            </div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
