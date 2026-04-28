// src/app/produto/[slug]/ProdutoDetalheClient.tsx
"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Truck, ChevronLeft, ChevronRight, ArrowLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

interface ProductImage {
  url: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  name: string;
  brand: string;
  price: string;
  installments?: string;
  status: string;
  year?: string;
  condition: string;
  weight?: string;
  description: string;
  specs: ProductSpec[];
  images: ProductImage[];
}

export default function ProdutoDetalheClient({ product, whatsapp }: { product: Product, whatsapp: string }) {
  const router = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Estados para a Lupa
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextImg = () => setActiveImg((prev) => (prev + 1) % product.images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);

  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const finalWhatsapp = cleanWhatsapp.startsWith('55') ? cleanWhatsapp : `55${cleanWhatsapp}`;
  const WHATSAPP_URL = `https://wa.me/${finalWhatsapp}?text=Olá, tenho interesse em saber mais sobre o instrumento: ${product.name}`;

  // Funções da Lupa
  const updateMagnifierPosition = (clientX: number, clientY: number, target: HTMLElement) => {
    const { top, left, width, height } = target.getBoundingClientRect();
    const xPos = clientX - left;
    const yPos = clientY - top;
    
    if (xPos < 0 || yPos < 0 || xPos > width || yPos > height) {
      setShowMagnifier(false);
    } else {
      setXY([xPos, yPos]);
      setSize([width, height]);
      setShowMagnifier(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;
    updateMagnifierPosition(e.clientX, e.clientY, e.currentTarget as HTMLElement);
  };

  const handleTouchMove = (e: TouchEvent) => {
    // Zoom automático no mobile ao arrastar
    const touch = e.touches[0];
    updateMagnifierPosition(touch.clientX, touch.clientY, e.currentTarget as HTMLElement);
  };

  if (!isMounted) {
    return (
      <div className={styles.contentLayout} style={{ opacity: 0 }}>
        <div className={styles.galleryCol}></div>
        <aside className={styles.infoCol}></aside>
      </div>
    );
  }

  return (
    <>
      <div className={styles.backNav}>
        <button onClick={() => router.back()} className={styles.backLink}>
          <ArrowLeft size={16} /> VOLTAR A PÁGINA ANTERIOR
        </button>
      </div>

    <div className={styles.contentLayout}>
      <div className={styles.galleryCol}>
        <div className={styles.mainImageContainer}>
          <AnimatePresence mode="wait">
            {product.images.length > 0 ? (
              <motion.img
                key={activeImg}
                src={product.images[activeImg].url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.mainImg}
                alt={product.name}
                onClick={() => setIsZoomed(true)}
              />
            ) : (
              <div className={styles.noImg}>Sem imagem disponível</div>
            )}
          </AnimatePresence>
          
          {product.images.length > 1 && (
            <>
              <button onClick={prevImg} className={styles.carouselBtn} style={{ left: '1rem' }}><ChevronLeft size={24} /></button>
              <button onClick={nextImg} className={styles.carouselBtn} style={{ right: '1rem' }}><ChevronRight size={24} /></button>
            </>
          )}
        </div>

        <div className={styles.thumbnailGrid}>
          {product.images.map((img, i) => (
            <div 
              key={i} 
              className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
              onClick={() => setActiveImg(i)}
            >
              <img src={img.url} alt="Thumbnail" />
            </div>
          ))}
        </div>
      </div>

      <aside className={styles.infoCol}>
        <div className={styles.stickyContent}>
          <span className={styles.brandTag}>{product.brand}</span>
          <h1 className={productNameStyles(product.name)}>{product.name}</h1>
          <div className={`${styles.statusBadge} ${product.status !== 'Disponivel' ? styles.statusSold : ''}`}>
            {product.status.toUpperCase()}
          </div>

          <div className={styles.priceContainer}>
            <span className={styles.price}>{product.price}</span>
            {product.installments && <p className={styles.installments}>{product.installments}</p>}
          </div>

          <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }} />

          <a href={WHATSAPP_URL} target="_blank" className={styles.ctaButton}>
            <Phone size={18} fill="currentColor" />
            TENHO INTERESSE
          </a>

          <div className={styles.benefits}>
            <div className={styles.benefitItem}><ShieldCheck size={18} color="#D4AF37" /><span>Autenticidade Garantida</span></div>
            <div className={styles.benefitItem}><Truck size={18} color="#D4AF37" /><span>Envio Seguro para todo Brasil</span></div>
          </div>

          <div className={styles.specsSection}>
            <h3>DETALHES TÉCNICOS</h3>
            <div className={styles.specsGrid}>
              {product.year && <div className={styles.specRow}><span>Ano:</span> <strong>{product.year}</strong></div>}
              <div className={styles.specRow}><span>Condição:</span> <strong>{product.condition}</strong></div>
              {product.weight && <div className={styles.specRow}><span>Peso:</span> <strong>{product.weight}</strong></div>}
              {product.specs.map((spec, i) => (
                <div key={i} className={styles.specRow}><span>{spec.label}:</span> <strong>{spec.value}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>

      <AnimatePresence>
        {isZoomed && product.images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className={styles.zoomOverlay}
            onClick={() => { setIsZoomed(false); setShowMagnifier(false); }}
          >
            <button onClick={() => { setIsZoomed(false); setShowMagnifier(false); }} className={styles.closeZoomBtn}>
              <X size={32} />
            </button>
            
            <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
              {/* Setas ocultas apenas se a lupa estiver sendo USADA (toque ativo) */}
              {product.images.length > 1 && !showMagnifier && (
                <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className={styles.modalNavBtn} style={{ left: '1.5rem' }}>
                  <ChevronLeft size={32} />
                </button>
              )}
              
              <div 
                className={styles.magnifierModalArea}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setShowMagnifier(false)}
                onTouchStart={(e) => updateMagnifierPosition(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget)}
                onTouchMove={handleTouchMove}
                onTouchEnd={() => setShowMagnifier(false)}
              >
                <img 
                  src={product.images[activeImg].url} 
                  alt="Zoomed" 
                  className={styles.zoomedImg}
                />

                {showMagnifier && (
                  <div
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      height: isMobile ? "220px" : "300px",
                      width: isMobile ? "220px" : "300px",
                      top: `${y - (isMobile ? 110 : 150)}px`,
                      left: `${x - (isMobile ? 110 : 150)}px`,
                      border: "3px solid #D4AF37",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      backgroundImage: `url('${product.images[activeImg].url}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: `${imgWidth * 2.2}px ${imgHeight * 2.2}px`,
                      backgroundPosition: `${-x * 2.2 + (isMobile ? 110 : 150)}px ${-y * 2.2 + (isMobile ? 110 : 150)}px`,
                      boxShadow: "0 0 50px rgba(0,0,0,0.8)",
                      zIndex: 10001
                    }}
                  />
                )}
              </div>

              {product.images.length > 1 && !showMagnifier && (
                <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className={styles.modalNavBtn} style={{ right: '1.5rem' }}>
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            <div className={styles.zoomModalThumbnails} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalThumbGrid}>
                {product.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img.url} 
                    alt={`Thumbnail view ${i}`}
                    onClick={() => setActiveImg(i)}
                    className={`${styles.modalThumb} ${activeImg === i ? styles.modalThumbActive : ''}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function productNameStyles(name: string) {
  if (name.length > 40) return `${styles.productName} ${styles.productNameLong}`;
  return styles.productName;
}
