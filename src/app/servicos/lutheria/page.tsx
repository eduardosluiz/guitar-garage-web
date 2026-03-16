"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { Wrench, CheckCircle2, ArrowRight, AlertTriangle, ShieldCheck, X, ChevronLeft, ChevronRight, Droplet, Zap } from 'lucide-react';
import styles from './page.module.css';

export default function Lutheria() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const imgLuth = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1200";
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1200";

  const servicos = [
    "Regulagem Completa (Oitavas, tensor, altura)",
    "Blindagem de Elétrica (Copper foil)",
    "Troca de Trastes (Re-fret profissional)",
    "Colagem de Headstock e Reparos Estruturais",
    "Confecção de Nut e Rastilho em Osso",
    "Instalação de Captadores e Circuitos",
    "Restauração de Instrumentos Vintage"
  ];

  const projetos = [
    {
      id: 1,
      title: "Restauração Fender Strat 1964",
      description: "Recuperação total de acabamento em Nitrocelulose Fiesta Red original. Blindagem completa e refretamento com trastes de inox.",
      images: [imgLuth, imgGtr, "https://images.unsplash.com/photo-1564186763535-ebb21ef52784?q=80&w=1200"]
    },
    { id: 2, title: "Custom Paint Goldtop", description: "Pintura Goldtop clássica com craquelado natural (aging process).", images: [imgGtr, imgLuth] },
    { id: 3, title: "Refretamento Gibson ES-335", description: "Troca de trastes mantendo a originalidade do binding.", images: [imgLuth, imgGtr] },
    { id: 4, title: "Vintage Restoration", description: "Restauração estrutural pesada em corpo de mogno.", images: [imgGtr, imgLuth] },
    { id: 5, title: "Electronics Upgrade", description: "Blindagem e fiação vintage cloth com capacitores PIO.", images: [imgLuth, imgGtr] },
    { id: 6, title: "Headstock Repair", description: "Colagem estrutural invisível com reforço interno.", images: [imgGtr, imgLuth] }
  ];

  const handleOpenModal = (projeto: any) => {
    setSelectedProject(projeto);
    setActiveImg(0);
  };

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>EXCELÊNCIA TÉCNICA</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.title}>
            LUTHERIA<br /><span>DE ALTA PERFORMANCE.</span>
          </motion.h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderPremium}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>PROFISSIONALISMO</span>
              <h2>O CUIDADO QUE SEU<br /><span>INSTRUMENTO MERECE</span></h2>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.textSide}>
              <p>Desde 2012, a Guitar Garage é referência técnica no Rio Grande do Sul. Nosso serviço de lutheria é reconhecido pela excelência no trato com instrumentos de alto valor e relíquias históricas.</p>
              <p>Combinamos técnicas tradicionais com as melhores ferramentas do mercado para garantir o timbre definitivo.</p>
              <div className={styles.servicesList}>
                {servicos.map((item, i) => (
                  <div key={i} className={styles.listItem}>
                    <CheckCircle2 size={18} color="#D4AF37" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className={styles.ctaBtn}>SOLICITAR ORÇAMENTO <ArrowRight size={16} /></button>
            </div>

            <div className={styles.imageSide}>
              <img src={imgLuth} alt="Lutheria Workshop" />
              
              <div className={styles.manifestoBlock}>
                <div className={styles.manifestoItem}>
                  <ShieldCheck size={18} color="#D4AF37" />
                  <p>Nossa especialidade é restaurar instrumentos antigos.</p>
                </div>
                <div className={styles.manifestoItem}>
                  <Zap size={18} color="#D4AF37" />
                  <p>Rebobinamos pick ups com fios e técnicas originais.</p>
                </div>
                <div className={styles.manifestoItem}>
                  <Wrench size={18} color="#D4AF37" />
                  <p>Em nossas pinturas, utilizamos as mesmas técnicas e materiais dos anos 50/60.</p>
                </div>
                <div className={styles.manifestoItem}>
                  <AlertTriangle size={18} color="#D4AF37" />
                  <p>
                    <strong>Puliuretano é um material proibido</strong> em nossa cabine de pintura, só trabalhamos com nitro celulose, seja como fundo, cor ou verniz.
                  </p>
                </div>
                <div className={styles.manifestoItem}>
                  <Droplet size={18} color="#D4AF37" />
                  <p>Oferecemos os serviços de pré envelhecimento e relic em pinturas, plásticos e hardware.</p>
                </div>
                
                <div className={styles.manifestoFooter}>
                  <p>Abaixo alguns exemplos do que temos feito em termos de restauração ao longo de 10 anos de Guitar Garage.</p>
                  <span className={styles.priceNotice}>Preços e condições sob consulta.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA DE PROJETOS - APROXIMADA */}
      <section className={styles.galleryFull}>
        <div className={styles.galleryGrid}>
          {projetos.map((projeto, index) => (
            <div key={index} className={styles.galleryItem} onClick={() => handleOpenModal(projeto)}>
              <img src={projeto.images[0]} alt={projeto.title} />
              <div className={styles.galleryOverlay}>
                <span>VISUALIZAR PROJETO</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className={styles.modalOverlay} 
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              className={styles.modalContent} 
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setSelectedProject(null)}><X size={24} /></button>
              
              <div className={styles.modalLayout}>
                <div className={styles.modalGallery}>
                  <div className={styles.mainImgBox}>
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImg}
                        src={selectedProject.images[activeImg]} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        alt="Detail" 
                      />
                    </AnimatePresence>
                    {selectedProject.images.length > 1 && (
                      <div className={styles.modalNav}>
                        <button onClick={() => setActiveImg(prev => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)}><ChevronLeft/></button>
                        <button onClick={() => setActiveImg(prev => (prev + 1) % selectedProject.images.length)}><ChevronRight/></button>
                      </div>
                    )}
                  </div>
                  <div className={styles.thumbGrid}>
                    {selectedProject.images.map((img: any, i: number) => (
                      <div 
                        key={i} 
                        className={`${styles.modalThumb} ${activeImg === i ? styles.activeThumb : ''}`} 
                        onClick={() => setActiveImg(i)}
                      >
                        <img src={img} alt={`Thumb ${i}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.modalInfo}>
                  <span className={styles.preTitle}>RESTAURAÇÃO & CUSTOM</span>
                  <h2>{selectedProject.title}</h2>
                  <div className={styles.modalDivider}></div>
                  <p>{selectedProject.description}</p>
                  <button className={styles.ctaBtn} onClick={() => setSelectedProject(null)}>FECHAR GALERIA</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
