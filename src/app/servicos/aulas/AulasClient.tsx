"use client";

import { motion } from 'framer-motion';
import { GraduationCap, Music, Users, ArrowRight, BookOpen, Mic2, Phone } from 'lucide-react';
import styles from './page.module.css';

export default function AulasClient({ 
  banner, 
  whatsapp, 
  professorImage 
}: { 
  banner: any, 
  whatsapp: string, 
  professorImage?: string 
}) {
  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const WHATSAPP_URL = `https://wa.me/${cleanWhatsapp}?text=Olá, gostaria de informações sobre as aulas na Guitar Garage.`;

  return (
    <>
      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: banner ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${banner.imagemUrl}')` : 'none',
          backgroundColor: banner ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>
            {banner?.preTitulo || 'MENTORIA MUSICAL'}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.title}
          >
            {banner?.titulo ? (
              <>
                {banner.titulo.trim()}<br />
                <span>{banner.subtitulo || ''}</span>
              </>
            ) : (
              <>
                AULAS DE<br /><span>GUITARRA, BAIXO E VIOLÃO.</span>
              </>
            )}
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
              <span className={styles.instructorSubtitle}>Guitarrista e vocalista da Banda Chaise Brothers.</span>
              
              <p>
                A Guitar Garage dispõe de material didático exclusivo e instrumentos apropriados para uma experiênca de aprendizado completa num ambiente imersivo.<br />
                Nossas aulas são ministradas individualmente ou em duplas.<br />
                Os pontos abordados incluem: Conceitos teóricos de harmonia e improvisação, técnica e prática em violão, guitarra e contrabaixo. timbragem e aprimoramento nos mais diversos estilos.<br />
                Possuímos um grande acervo de material relacionado às particularidades e linguagem do Blues e Rock.
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
                <a href={WHATSAPP_URL} target="_blank" className={styles.ctaBtn} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Phone size={16} fill="currentColor" /> CONSULTAR DISPONIBILIDADE <ArrowRight size={16} />
                </a>
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
                <img src={professorImage || "/profrodrigo.jpg"} alt="Professor - Aulas de Música" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
