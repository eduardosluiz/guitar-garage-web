"use client";

import { motion } from 'framer-motion';
import { GraduationCap, Music, Users, ArrowRight, BookOpen, Mic2 } from 'lucide-react';
import styles from './page.module.css';

export default function AulasClient() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>MENTORIA MUSICAL</motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.title}
          >
            AULAS DE<br /><span>GUITARRA, BAIXO E VIOLÃO.</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          
          <div className={styles.sectionHeaderPremium}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>PROFISSIONALISMO</span>
              <h2>DESENVOLVIMENTO TÉCNICO<br /><span>E IMERSIVO</span></h2>
            </div>
          </div>

          <div className={styles.mainGrid}>
            <div className={styles.infoSide}>
              <span className={styles.instructorName}>PROF. RODRIGO CHAISE</span>
              
              <p>
                A Guitar Garage dispõe de sala de aula equipada, material didático exclusivo e instrumentos 
                apropriados para uma experiência de aprendizado completa. Nossas aulas são ministradas 
                individualmente ou em duplas por professores reconhecidamente qualificados.
              </p>

              <p>
                Os pontos abordados incluem: Conceitos teóricos de harmonia e improvisação, técnica e 
                prática em Violão, Guitarra e Contrabaixo. Possuímos um grande acervo de material 
                relacionado às particularidades e linguagem do Blues e Rock.
              </p>
              
              <div className={styles.benefits}>
                <div className={styles.benefitItem}>
                  <BookOpen size={24} color="#D4AF37" />
                  <div>
                    <h4>Material Didático Próprio</h4>
                    <p>Suporte completo para o seu desenvolvimento teórico e prático.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <Mic2 size={24} color="#D4AF37" />
                  <div>
                    <h4>Linguagem do Blues & Rock</h4>
                    <p>Especialização em timbres e técnicas dos gêneros que definiram gerações.</p>
                  </div>
                </div>
              </div>

              <div className={styles.callToAction}>
                <p>Temos horários disponíveis. Para obter mais informações sobre horários, preços e pacotes, entre em contato.</p>
                <button className={styles.ctaBtn}>CONSULTAR DISPONIBILIDADE <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className={styles.imageSide}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, cubicBezier: [0.165, 0.84, 0.44, 1] }}
                viewport={{ once: true }}
                className={styles.imageWrapper}
              >
                <img src="/profrodrigo.jpg" alt="Prof. Rodrigo Chaise - Aulas de Música" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
