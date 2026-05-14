// src/app/servicos/custom-pickups/[slug]/ToneDetailClient.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Truck, ChevronLeft, ChevronRight, ArrowLeft, X, PlayCircle, Music } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface ToneMedia {
  url: string;
  tipo: 'imagem' | 'audio';
  ordem: number;
  titulo?: string;
}

interface Tone {
  name: string;
  tag: string;
  description: string;
  specs: { label: string; value: string }[];
  media: ToneMedia[];
}

export default function ToneDetailClient({ tone, whatsapp }: { tone: Tone, whatsapp: string }) {
  const router = useRouter();
  const [activeMedia, setActiveMedia] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const audios = tone.media.filter(m => m.tipo === 'audio').sort((a, b) => a.ordem - b.ordem);
  const images = tone.media.filter(m => m.tipo === 'imagem').sort((a, b) => a.ordem - b.ordem);
  
  // Se não houver audios cadastrados, usamos mocks conforme solicitado
  const displayAudios = audios.length > 0 ? audios : [
    { url: '#', tipo: 'audio', ordem: 1 },
    { url: '#', tipo: 'audio', ordem: 2 },
    { url: '#', tipo: 'audio', ordem: 3 },
    { url: '#', tipo: 'audio', ordem: 4 },
    { url: '#', tipo: 'audio', ordem: 5 },
  ] as ToneMedia[];

  // Nessa página, mostramos apenas ÁUDIOS na galeria conforme solicitado
  const allMedia = audios;
  const currentMedia = allMedia[activeMedia];

  // Efeito para forçar o play quando o áudio muda, mas apenas após a primeira interação
  useEffect(() => {
    if (isMounted && currentMedia?.tipo === 'audio' && audioRef.current && hasInteracted) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play was prevented:", error);
        });
      }
    }
  }, [activeMedia, isMounted, currentMedia, hasInteracted]);

  const handleSampleClick = (index: number) => {
    if (audios.length > 0) {
      setHasInteracted(true);
      setActiveMedia(index);
    }
  };

  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const WHATSAPP_URL = `https://wa.me/${cleanWhatsapp}?text=Olá, tenho interesse em saber mais sobre o set de captadores: ${tone.name}`;

  if (!isMounted) return null;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.backNav}>
        <button onClick={() => router.back()} className={styles.backLink}>
          <ArrowLeft size={16} /> VOLTAR A PÁGINA ANTERIOR
        </button>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.galleryCol}>
          <div className={styles.mainImageContainer} style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <AnimatePresence mode="wait">
              {currentMedia?.tipo === 'audio' ? (
                <motion.div 
                  key={currentMedia.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ width: '100%', padding: '2rem', textAlign: 'center' }}
                >
                  <Music size={60} color="#D4AF37" style={{ marginBottom: '1.5rem' }} />
                  <audio ref={audioRef} controls src={currentMedia.url} style={{ width: '100%', height: '35px' }}>
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                  <div style={{ marginTop: '1.5rem' }}>
                    <p style={{ color: '#D4AF37', margin: 0, fontFamily: 'Space Grotesk', fontSize: '0.65rem', letterSpacing: '3px', fontWeight: 800, textTransform: 'uppercase' }}>
                      OUVINDO AGORA
                    </p>
                    <p style={{ color: '#FFF', margin: '0.5rem 0 0 0', fontFamily: 'Space Grotesk', fontSize: '0.9rem', fontWeight: 500 }}>
                      {currentMedia.titulo || `${tone.name} - SAMPLE`}
                    </p>
                  </div>
                </motion.div>
              ) : currentMedia?.tipo === 'imagem' ? (
                <motion.img
                  key={currentMedia.url}
                  src={currentMedia.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.mainImg}
                  alt={tone.name}
                  style={{ opacity: 0.8 }}
                />
              ) : (
                <div className={styles.noImg}>Sem mídia disponível</div>
              )}
            </AnimatePresence>
          </div>
          
          <div className={styles.thumbnailGrid}>
            {allMedia.map((m, i) => (
              <div 
                key={i} 
                className={`${styles.thumb} ${activeMedia === i ? styles.thumbActive : ''}`} 
                onClick={() => handleSampleClick(i)}
                style={{ position: 'relative', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {m.tipo === 'audio' ? (
                  <Music size={18} color={activeMedia === i ? "#D4AF37" : "#444"} />
                ) : (
                  <img src={m.url} alt="Thumbnail" />
                )}
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.infoCol}>
          <div className={styles.stickyContent}>
            <span className={styles.brandTag}>{tone.tag}</span>
            <h1 className={styles.productName}>{tone.name}</h1>
            
            <div className={styles.description}>
              <p>{tone.description}</p>
            </div>

            {/* SEÇÃO DINÂMICA DE SAMPLES - POSICIONADA MAIS ACIMA */}
            <div className={styles.samplesSection} style={{ marginTop: '-1.5rem', marginBottom: '3.5rem' }}>
              <h3 style={{ fontSize: '0.65rem', color: '#D4AF37', marginBottom: '1.5rem', letterSpacing: '2px', opacity: 1, fontWeight: 800 }}>SAMPLES DISPONÍVEIS</h3>
              <div className={styles.samplesList}>
                {displayAudios.map((audio, i) => (
                  <div 
                    key={i} 
                    className={styles.sampleItem}
                    style={{ 
                      cursor: audios.length > 0 ? 'pointer' : 'default',
                      opacity: 1,
                      borderColor: 'rgba(255,255,255,0.15)',
                      padding: '0.8rem 0'
                    }}
                    onClick={() => {
                      if (audios.length > 0) {
                        const originalIndex = allMedia.findIndex(m => m.url === audio.url);
                        if (originalIndex !== -1) handleSampleClick(originalIndex);
                      }
                    }}
                  >
                    <PlayCircle size={20} color="#D4AF37" style={{ fill: 'rgba(212, 175, 55, 0.1)' }} />
                    <span style={{ textTransform: 'uppercase', fontWeight: 800, color: '#FFFFFF', fontSize: '0.85rem', letterSpacing: '1px' }}>
                      {audio.titulo || `${tone.name} - SAMPLE #${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a href={WHATSAPP_URL} target="_blank" className={styles.ctaButton}>
              <Phone size={18} fill="currentColor" />
              SOLICITAR ORÇAMENTO
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
