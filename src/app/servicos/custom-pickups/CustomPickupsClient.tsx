"use client";

import { motion } from 'framer-motion';
import { Mic2, Zap, Target, ArrowRight, PlayCircle, Music } from 'lucide-react';
import styles from './page.module.css';

export default function CustomPickupsClient() {
  const samples = [
    "Two Tone - NECK (Solon Fishbone)",
    "Two Tone - NECK/ MIDDLE (Solon Fishbone)",
    "Two Tone - MIDDLE (Solon Fishbone)",
    "Two Tone - MIDDLE/ BRIDGE (Solon Fishbone)",
    "Two Tone - BRIDGE (Solon Fishbone)",
    "Three - NECK (Solon Fishbone)",
    "Three - NECK/ MIDDLE (Solon Fishbone)",
    "Three - MIDDLE (Solon Fishbone)",
    "Three - MIDDLE/ BRIDGE (Solon Fishbone)",
    "Three - BRIDGE (Solon Fishbone)"
  ];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>TONE CHASING</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.title}>
            GG CUSTOM<br /><span>HANDWOUND PICKUPS.</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.samplesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderPremium}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>SOUNDCHECK</span>
              <h2>OUÇA NOSSOS<br /><span>SAMPLES</span></h2>
            </div>
            <a href="https://soundcloud.com/guitargarage-1" target="_blank" className={styles.externalLink}>
              SOUNDCLOUD OFICIAL <ArrowRight size={16}/>
            </a>
          </div>

          <div className={styles.samplesGrid}>
            <div className={styles.samplesList}>
              {samples.map((sample, i) => (
                <div key={i} className={styles.sampleItem}>
                  <PlayCircle size={18} color="#D4AF37" />
                  <span>{sample}</span>
                </div>
              ))}
            </div>
            <div className={styles.soundcloudInvite}>
              <Music size={48} />
              <p>Confira a nossa coleção completa de samples no SoundCloud.</p>
              <a href="https://soundcloud.com/guitargarage-1" target="_blank" className={styles.ctaBtn}>OUVIR NO SOUNDCLOUD</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.teleSet}>
        <div className={styles.container}>
          <div className={styles.gridSplit}>
            <div className={styles.imageGrid}>
              <img src="https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800" alt="Tele Pickup 1" />
              <img src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800" alt="Tele Pickup 2" />
            </div>
            <div className={styles.textContent}>
              <span className={styles.preTitle}>LANÇAMENTO EXCLUSIVO</span>
              <h2>GUITAR GARAGE<br /><span>CUSTOM TELECASTER SET</span></h2>
              <div className={styles.divider}></div>
              <p>Depois de inúmeros pedidos, estamos lançando o nosso set de captadores para Telecaster. Seguindo a filosofia dos pick ups de strato, esta série foi produzida aos moldes dos originais da metade dos anos 50, liga de Alnico 5 e método scatter wind.</p>
              <p>Nosso modelo único batizado de <strong>Buttertone</strong> apresenta em ambos os pick ups resistência aproximada de 7.2.k, produzindo aquele timbre encorpado, rasgado e com o twang das Butterscotch Blondes dos anos 50.</p>
              <p>Fios de pano e cordão protegendo a bobina do captador da ponte dão o visual característico. No final um banho de parafina e cera de abelha pra assegurar o bom rendimento sem microfonia.</p>
              <button className={styles.ctaBtn}>SOLICITAR ORÇAMENTO <ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
