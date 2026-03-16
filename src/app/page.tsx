"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Link from 'next/link';
import { ArrowUpRight, Play, ArrowRight, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  const slides = [
    { title: "NOVIDADES", img: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1920" },
    { title: "RELÍQUIAS", img: "https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=1920" },
    { title: "GUITARRAS", img: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1920" },
  ];

  const guitars = [
    { id: 1, name: 'Gretsch 6120 Nashville', brand: 'Gretsch', price: 'R$ 24.900', img: imgGtr, slug: 'gretsch-6120' },
    { id: 2, name: 'Fender Stratocaster 1974', brand: 'Fender', price: 'R$ 18.500', img: imgGtr, slug: 'fender-strat-74' },
    { id: 3, name: 'Gibson SG Standard', brand: 'Gibson', price: 'R$ 16.200', img: imgGtr, slug: 'gibson-sg' },
  ];

  const basses = [
    { id: 4, name: 'Fender Precision 1978', brand: 'Fender', price: 'R$ 15.900', img: imgBass, slug: 'fender-pbass-78' },
    { id: 5, name: 'Rickenbacker 4003', brand: 'Rickenbacker', price: 'R$ 22.500', img: imgBass, slug: 'rick-4003' },
    { id: 6, name: 'Music Man StingRay', brand: 'Music Man', price: 'R$ 14.200', img: imgBass, slug: 'stingray' },
  ];

  const acoustics = [
    { id: 7, name: 'Martin D-28 Authentic', brand: 'Martin', price: 'R$ 35.000', img: imgGtr, slug: 'martin-d28' },
    { id: 8, name: 'Taylor 814ce V-Class', brand: 'Taylor', price: 'R$ 28.900', img: imgGtr, slug: 'taylor-814' },
    { id: 9, name: 'Gibson Hummingbird', brand: 'Gibson', price: 'R$ 26.500', img: imgGtr, slug: 'gibson-humming' },
  ];

  const ampsData = [
    { id: 10, name: 'Vox AC30 1964 JMI', brand: 'Vox', price: 'R$ 28.000', img: imgAmp, slug: 'vox-ac30-64' },
    { id: 11, name: 'Marshall JTM45 Offset', brand: 'Marshall', price: 'R$ 32.500', img: imgAmp, slug: 'marshall-jtm45' },
    { id: 12, name: 'Fender Twin Reverb', brand: 'Fender', price: 'R$ 12.200', img: imgAmp, slug: 'fender-twin' },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <main className={styles.main}>
      <Header />

      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className={styles.categoryLabel}>// ESTABLISHED 2012</span>
            <h1 className={styles.heroTitle}>A ELEGÂNCIA<br />DO SOM.</h1>
          </motion.div>
          <div className={styles.heroDivider} />
          <div className={styles.heroFooterFixed}>
            <p>Curadoria de elite para colecionadores de alto nível.</p>
            <div className={styles.heroActions}>
              <Link href="/categoria/guitarras" className={styles.btnInventario}>VER INVENTÁRIO <ArrowUpRight size={16} /></Link>
              <button className={styles.playBtn}><Play size={14} fill="currentColor" /> VÍDEO</button>
            </div>
          </div>
        </div>

        <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }} className={styles.heroRight}>
          <AnimatePresence mode="wait">
            {isClient && (
              <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={styles.imageContainer}>
                <img src={slides[currentSlide].img} alt="Hero" />
                <div className={styles.overlayGradient}></div>
                <div className={styles.slideInfo}>
                  <span className={styles.slideTag}>NOVIDADES</span>
                  <h3>{slides[currentSlide].title}</h3>
                  <Link href="/categoria/novidades" className={styles.slideLink}>VER AGORA <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={styles.carouselControls}>
            <button onClick={prevSlide} className={styles.navBtn}><ChevronLeft size={24}/></button>
            <button onClick={nextSlide} className={styles.navBtn}><ChevronRight size={24}/></button>
          </div>
        </motion.div>
      </section>

      {/* 2. CATEGORIAS */}
      <section className={styles.catSection}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
          <div className={styles.titleStacked}>
            <span className={styles.preTitle}>CURADORIA</span>
            <h2>ENCONTRE POR<br /><span>Categorias</span></h2>
          </div>
        </motion.div>
        <div className={styles.bentoGrid}>
          <BentoCard name="GUITARRAS" img={imgGtr} cls={styles.bentoGtr} />
          <BentoCard name="BAIXOS" img={imgBass} cls={styles.bentoBass} />
          <BentoCard name="AMPS" img={imgAmp} cls={styles.bentoSmall} />
          <BentoCard name="VIOLÕES" img={imgGtr} cls={styles.bentoSmall} />
          <BentoCard name="PEDAIS" img={imgAmp} cls={styles.bentoSmall} />
          <BentoCard name="CUSTOM" img={imgBass} cls={styles.bentoSmall} />
        </div>
      </section>

      {/* 3. RELÍQUIAS */}
      <section className={styles.reliquiasSection}>
        <div className={styles.reliquiasSplit}>
          <div className={styles.reliquiasTextSide}>
            <span className={styles.preTitle}>THE VAULT</span>
            <h2>O COFRE DAS<br /><span className={styles.textWhite}>Relíquias.</span></h2>
            <p>Instrumentos históricos selecionados a dedo com alto potencial de valorização.</p>
            <Link href="/categoria/reliquias" className={styles.btnReliquias}>VER RELÍQUIAS</Link>
          </div>
          <div className={styles.reliquiasGallerySide}>
            <Link href="/produto/fender-64" className={styles.reliquiaArtItem}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: -30 }} transition={{ duration: 1.5 }}>
                <img src={imgGtr} alt="R1" />
                <div className={styles.reliquiaCaption}><span>VINTAGE 1964</span><h4>FENDER STRAT</h4></div>
              </motion.div>
            </Link>
            <Link href="/produto/pbass-72" className={styles.reliquiaArtItem}>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 40 }} transition={{ duration: 1.5, delay: 0.2 }}>
                <img src={imgBass} alt="R2" />
                <div className={styles.reliquiaCaption}><span>HISTORIC 1972</span><h4>P-BASS</h4></div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GUITARRAS */}
      <section className={styles.galleryWhite}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
          <div className={styles.titleStacked}>
            <span className={styles.preTitle}>AS SEIS CORDAS</span>
            <h2>GUITARRAS<br /><span>Estoque</span></h2>
          </div>
          <Link href="/categoria/guitarras" className={styles.exploreLink}>VER TODAS <ArrowRight size={16} /></Link>
        </motion.div>
        <div className={styles.productFlex}>{guitars.map(p => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      {/* 5. BAIXOS */}
      <section className={styles.galleryDark}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
          <div className={styles.titleStacked}>
            <span className={styles.preTitle}>GRAVES PROFUNDOS</span>
            <h2 className={styles.textWhite}>BAIXOS<br /><span className={styles.textMuted}>Coleção</span></h2>
          </div>
          <Link href="/categoria/baixos" className={styles.exploreLinkWhite}>VER TODOS <ArrowRight size={16} /></Link>
        </motion.div>
        <div className={styles.productFlex}>{basses.map(p => <ProductCard key={p.id} p={p} isDark />)}</div>
      </section>

      {/* 6. VIOLÕES */}
      <section className={styles.galleryOffWhite}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
          <div className={styles.titleStacked}>
            <span className={styles.preTitle}>RARIDADES</span>
            <h2>VIOLÕES<br /><span>Raridades</span></h2>
          </div>
          <Link href="/categoria/violoes" className={styles.exploreLink}>VER TODOS <ArrowRight size={16} /></Link>
        </motion.div>
        <div className={styles.productFlex}>{acoustics.map(p => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      {/* 7. AMPS */}
      <section className={styles.galleryWhite}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
          <div className={styles.titleStacked}>
            <span className={styles.preTitle}>POTÊNCIA</span>
            <h2>AMPLIFICADORES<br /><span>Estoque</span></h2>
          </div>
          <Link href="/categoria/amps" className={styles.exploreLink}>VER TODOS <ArrowRight size={16} /></Link>
        </motion.div>
        <div className={styles.productFlex}>{ampsData.map(p => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      {/* 8. ATENDIMENTO */}
      <section className={styles.bookingSplitSection}>
        <div className={styles.bookingContainer}>
          <div className={styles.bookingLeft}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>EXPERIÊNCIA</span>
              <h2>ATENDIMENTO<br /><span>Individual</span></h2>
            </div>
            <p className={styles.bookingText}>Agende uma visita exclusiva para testar nossos equipamentos mais raros.</p>
            <button className={styles.btnInventario}>AGENDAR AGORA <ArrowUpRight size={16}/></button>
          </div>
          <div className={styles.bookingRightCol}>
            <div className={styles.mapWrapper}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.247524416148!2d-51.2054121!3d-30.031181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197836ea67aa59%3A0x123bb6740bc5bc3a!2sRua%20Miguel%20Tostes%2C%20870!5e0!3m2!1spt-BR!2sbr!4v1708980000000" width="100%" height="400" style={{ border: 0 }} allowFullScreen={true}></iframe>
            </div>
            <div className={styles.contactInfoGrid}>
              <div className={styles.infoItem}><Phone size={18} color="#D4AF37" /><p>(51) 3331.3234 | (51) 3062.7054</p></div>
              <div className={styles.infoItem}><Mail size={18} color="#D4AF37" /><p>contato@guitargarage.com.br</p></div>
              <div className={styles.infoItem}><Clock size={18} color="#D4AF37" /><p>Segunda à Sexta: 13:30 - 19:00</p></div>
              <div className={styles.infoItem}><MapPin size={18} color="#D4AF37" /><p>Rua Miguel Tostes, 870 | Porto Alegre</p></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ p, isDark }: any) {
  return (
    <Link href={`/produto/${p.slug}`} className={styles.productCardLink}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02, y: -10 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className={styles.productItem}>
        <div className={styles.imgWrapper}><img src={p.img} alt={p.name} /></div>
        <div className={styles.info}>
          <span className={styles.brandName}>{p.brand}</span>
          <h3>{p.name}</h3>
          <span className={isDark ? styles.priceDark : styles.priceLight}>{p.price}</span>
        </div>
      </motion.div>
    </Link>
  );
}

function BentoCard({ name, img, cls }: any) {
  return (
    <Link href={`/categoria/${name.toLowerCase()}`} className={`${styles.luxuryCatCard} ${cls}`}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20 }} whileHover={{ scale: 1.02, rotateY: 5, rotateX: -2 }} className={styles.luxuryCardInner}>
        <img src={img} alt={name} />
        <div className={styles.luxuryOverlay}><h3>{name}</h3></div>
      </motion.div>
    </Link>
  );
}
