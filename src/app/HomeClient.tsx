// src/app/HomeClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import styles from './page.module.css';

interface Slide {
  id: number;
  title: string;
  img: string;
  href: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  img: string;
  slug: string;
  status?: string;
}

interface HomeClientProps {
  slides: Slide[];
  guitars: Product[];
  basses: Product[];
  acoustics: Product[];
  amps: Product[];
  categoryList?: Array<{ name: string, slug: string, img: string, linkDestino?: string | null }>;
  vintageList?: Product[];
}

export default function HomeClient({ slides, guitars, basses, acoustics, amps, categoryList = [], vintageList = [] }: HomeClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Fallback images if list is empty
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  return (
    <>
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className={styles.categoryLabel}>// DESDE 2002</span>
            <h1 className={styles.heroTitle}>A ALMA DA<br />SUA MÚSICA.</h1>
          </motion.div>
          <div className={styles.heroDivider} />
          <div className={styles.heroFooterFixed}>
            <p>Instrumentos de qualidade que você merece.</p>
            <div className={styles.heroActions}>
              <Link href={slides[currentSlide]?.href || "/estoque"} className={styles.btnInventario}>VER INVENTÁRIO <ArrowUpRight size={16} /></Link>
              <Link href="/sobre" className={styles.playBtn}>SOBRE NÓS</Link>
            </div>
          </div>
        </div>

        <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1] }} className={styles.heroRight}>
          <AnimatePresence mode="wait">
            {isClient && slides.length > 0 && (
              <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={styles.imageContainer}>
                <img src={slides[currentSlide].img} alt="Hero" />
                <div className={styles.overlayGradient}></div>
                <div className={styles.slideInfo}>
                  <span className={styles.slideTag}>DESTAQUE</span>
                  <h3>{slides[currentSlide].title}</h3>
                  <Link href={slides[currentSlide].href} className={styles.slideLink}>VER AGORA <ArrowRight size={16} /></Link>
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
          {(categoryList.length >= 6 ? categoryList : [
            ...categoryList,
            { name: "GUITARRAS", slug: "guitarras", img: imgGtr },
            { name: "BAIXOS", slug: "baixos", img: imgBass },
            { name: "AMPS", slug: "amps", img: imgAmp },
            { name: "VIOLÕES", slug: "violoes", img: imgGtr },
            { name: "PEDAIS", slug: "pedais", img: imgAmp },
            { name: "CUSTOM", slug: "custom", img: imgBass }
          ].slice(0, 6)).map((c, i) => {
            const cssClass = i === 0 ? styles.bentoGtr : i === 1 ? styles.bentoBass : styles.bentoSmall;
            return <BentoCard key={'cat-' + c.slug + i} name={c.name} img={c.img || imgGtr} slug={c.slug} linkDestino={c.linkDestino} cls={cssClass} />;
          })}
        </div>
      </section>

      {/* 3. RELÍQUIAS */}
      <section className={styles.reliquiasSection}>
        <div className={styles.reliquiasSplit}>
          <div className={styles.reliquiasTextSide}>
            <h2>VINTAGE<br />COLLECTION</h2>
            <p>O tempo é o maior luthier. Instrumentos que carregam a alma de lendas. Condições "Vintage" exclusivas, prontas para um novo dono.</p>
            <Link href="/categoria/vintage" className={styles.btnReliquias}>VER VINTAGE</Link>
          </div>
          <div className={styles.reliquiasGallerySide}>
            {vintageList && vintageList.length > 0 ? (
              vintageList.slice(0,2).map(p => (
                <Link key={p.id} href={`/produto/${p.slug}`} className={styles.reliquiaArtItem}>
                  <img src={p.img} alt={p.name} />
                  <div className={styles.reliquiaCaption}>
                    <span>{p.brand}</span>
                    <h4>{p.name}</h4>
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link href="/categoria/vintage" className={styles.reliquiaArtItem}>
                  <img src="https://images.unsplash.com/photo-1549448373-39ee6cff1ea4?q=80&w=800" alt="Vintage Detail 1" />
                  <div className={styles.reliquiaCaption}>
                    <span>FENDER</span>
                    <h4>1968 Relic Stratocaster</h4>
                  </div>
                </Link>
                <Link href="/categoria/vintage" className={styles.reliquiaArtItem}>
                  <img src="https://images.unsplash.com/photo-1453738773917-9c3eff1db985?q=80&w=800" alt="Vintage Detail 2" />
                  <div className={styles.reliquiaCaption}>
                    <span>GIBSON</span>
                    <h4>1974 Classic Les Paul</h4>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. GUITARRAS */}
      {guitars.length > 0 && (
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
      )}

      {/* 5. BAIXOS */}
      {basses.length > 0 && (
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
      )}

      {/* 6. VIOLÕES */}
      {acoustics.length > 0 && (
        <section className={styles.galleryOffWhite}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>SONORIDADE ACÚSTICA</span>
              <h2>VIOLÕES<br /><span>Estoque</span></h2>
            </div>
            <Link href="/categoria/violoes" className={styles.exploreLink}>VER TODOS <ArrowRight size={16} /></Link>
          </motion.div>
          <div className={styles.productFlex}>{acoustics.map(p => <ProductCard key={p.id} p={p} />)}</div>
        </section>
      )}

      {/* 7. AMPS */}
      {amps.length > 0 && (
        <section className={styles.galleryWhite}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={styles.sectionHeader}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>POTÊNCIA</span>
              <h2>AMPLIFICADORES<br /><span>Estoque</span></h2>
            </div>
            <Link href="/categoria/amps" className={styles.exploreLink}>VER TODOS <ArrowRight size={16} /></Link>
          </motion.div>
          <div className={styles.productFlex}>{amps.map(p => <ProductCard key={p.id} p={p} />)}</div>
        </section>
      )}

      {/* 8. ATENDIMENTO */}
      <section className={styles.bookingSplitSection}>
        <div className={styles.bookingContainer}>
          <div className={styles.bookingLeft}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>EXPERIÊNCIA</span>
              <h2>ATENDIMENTO<br /><span>Individual</span></h2>
            </div>
            <p className={styles.bookingText}>Agende uma visita exclusiva para testar nossos equipamentos mais raros.</p>
            <Link href="https://wa.me/555133313234" target="_blank" className={styles.btnInventario}>AGENDAR AGORA <ArrowUpRight size={16}/></Link>
          </div>
          <div className={styles.bookingRightCol}>
            <div className={styles.mapWrapper}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.247524416148!2d-51.2054121!3d-30.031181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197836ea67aa59%3A0x123bb6740bc5bc3a!2sRua%20Miguel%20Tostes%2C%20870!5e0!3m2!1spt-BR!2sbr!4v1708980000000" width="100%" height="400" style={{ border: 0 }} allowFullScreen={true}></iframe>
            </div>
            <div className={styles.contactInfoGrid}>
              <div className={styles.infoItem}><Phone size={18} color="#D4AF37" /><p>(51) 3331.3234 | (51) 3062.7054</p></div>
              <div className={styles.infoItem}><Mail size={18} color="#D4AF37" /><p>contato@guitargarage.com.br</p></div>
              <div className={styles.infoItem}><Clock size={18} color="#D4AF37" /><p>Segunda à Sexta: 14:00 - 20:00</p></div>
              <div className={styles.infoItem}><MapPin size={18} color="#D4AF37" /><p>Rua Miguel Tostes, 870 | Porto Alegre</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ p, isDark }: { p: Product, isDark?: boolean }) {
  const isVendido = p.status === 'Vendido';
  return (
    <Link href={`/produto/${p.slug}`} className={styles.productCardLink}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02, y: -10 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className={styles.productItem}>
        <div className={styles.imgWrapper}>
          <img src={p.img} alt={p.name} />
          {isVendido && <div className={styles.soldBadge}>VENDIDO</div>}
        </div>
        <div className={styles.info}>
          <span className={styles.brandName}>{p.brand}</span>
          <h3>{p.name}</h3>
          <span className={isDark ? styles.priceDark : styles.priceLight}>{isVendido ? 'Vendido' : p.price}</span>
        </div>
      </motion.div>
    </Link>
  );
}

function BentoCard({ name, img, slug, cls, linkDestino }: { name: string, img: string, slug: string, cls: string, linkDestino?: string | null }) {
  const destino = linkDestino || `/categoria/${slug}`;
  return (
    <Link href={destino} className={`${styles.luxuryCatCard} ${cls}`}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 100, damping: 20 }} whileHover={{ scale: 1.02, rotateY: 5, rotateX: -2 }} className={styles.luxuryCardInner}>
        <img src={img} alt={name} />
        <div className={styles.luxuryOverlay}><h3>{name}</h3></div>
      </motion.div>
    </Link>
  );
}
