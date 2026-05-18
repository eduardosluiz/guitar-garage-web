"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, GraduationCap, Mic2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

interface ServicosClientProps {
  banners: {
    lutheria: any | null;
    pickups: any | null;
    aulas: any | null;
  };
  heroBanner?: any;
}

export default function ServicosClient({ banners, heroBanner }: ServicosClientProps) {
  const services = [
    {
      title: banners.lutheria?.titulo || "LUTHERIA ESPECIALIZADA",
      description: banners.lutheria?.subtitulo || "Mão de obra e ferramentas especializadas. Excelência, sensibilidade e cuidado no trato com instrumentos, sejam eles de entrada ou de alto valor.",
      icon: <Wrench size={32} />,
      img: banners.lutheria?.imagemUrl || "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800",
      href: "/servicos/lutheria"
    },
    {
      title: banners.pickups?.titulo || "GG GUITARRAS E PICKUPS",
      description: banners.pickups?.subtitulo || "Primeiro fabricante de captadores estilo vintage do Brasil. Produtos desenvolvidos desde 2004 baseados em originais 'Pré CBS'. Possuímos também uma linha de instrumentos customizados, atendendo de aficionados a grandes nomes como Armandinho, Fernando Noronha e Sammy Hagar.",
      icon: <Mic2 size={32} />,
      img: banners.pickups?.imagemUrl || "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800",
      href: "/servicos/custom-pickups"
    },
    {
      title: banners.aulas?.titulo || "AULAS DE GUITARRA",
      description: banners.aulas?.subtitulo || "Mentoria personalizada imersiva em um ambiente cercado pelos melhores instrumentos e amps. Aulas com conteúdo focado na parte musical (técnica, improvisação e conhecimento harmônico) passando por timbragem e aprimoramento nos mais diversos estilos.",
      icon: <GraduationCap size={32} />,
      img: banners.aulas?.imagemUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      href: "/servicos/aulas"
    }
  ];

  return (
    <>
      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: heroBanner?.imagemUrl ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${heroBanner.imagemUrl}')` : 'none',
          backgroundColor: heroBanner?.imagemUrl ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.preTitle}
          >
            {heroBanner?.preTitulo || 'SOLUÇÕES MUSICAIS'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            {heroBanner?.titulo ? (
              <span dangerouslySetInnerHTML={{ __html: heroBanner.titulo }} />
            ) : (
              <>MAIS QUE UMA LOJA,<br /><span>UM CENTRO DE TIMBRE.</span></>
            )}
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.introTitleHero}
          >
            {heroBanner?.subtitulo || '25 anos de serviços prestados aos guitarristas do Brasil.'}
          </motion.span>
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
    </>
  );
}
