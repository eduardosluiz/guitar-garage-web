// src/app/produto/[slug]/ProdutoDetalheClient.tsx
"use client";

import { useState } from 'react';
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

  const nextImg = () => setActiveImg((prev) => (prev + 1) % product.images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);

  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const finalWhatsapp = cleanWhatsapp.startsWith('55') ? cleanWhatsapp : `55${cleanWhatsapp}`;
  const WHATSAPP_URL = `https://wa.me/${finalWhatsapp}?text=Olá, tenho interesse em saber mais sobre o instrumento: ${product.name}`;

  return (
    <>
      <div className={styles.backNav} style={{ marginBottom: '1rem' }}>
        <button onClick={() => router.back()} className={styles.backLink} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.8rem' }}>
          <ArrowLeft size={16} /> VOLTAR A PÁGINA ANTERIOR
        </button>
      </div>

    <div className={styles.contentLayout}>
      {/* COLUNA ESQUERDA: CARROSSEL DE IMAGENS */}
      <div className={styles.galleryCol}>
        <div className={styles.mainImageContainer}>
          <AnimatePresence mode="wait">
            {product.images.length > 0 ? (
              <motion.img 
                key={activeImg}
                src={product.images[activeImg].url}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={styles.mainImg}
                onClick={() => setIsZoomed(true)}
                style={{ cursor: 'zoom-in' }}
              />
            ) : (
              <div className={styles.noImg}>Sem imagem disponível</div>
            )}
          </AnimatePresence>
          
          {product.images.length > 1 && (
            <>
              <button onClick={prevImg} className={styles.carouselBtn} style={{ left: '1rem' }}><ChevronLeft /></button>
              <button onClick={nextImg} className={styles.carouselBtn} style={{ right: '1rem' }}><ChevronRight /></button>
            </>
          )}
        </div>

        {/* MINIATURAS */}
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

      {/* COLUNA DIREITA: INFORMAÇÕES */}
      <aside className={styles.infoCol}>
        <div className={styles.stickyContent}>
          <span className={styles.brandTag}>{product.brand}</span>
          <h1 className={styles.productName}>{product.name}</h1>
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
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            onClick={() => setIsZoomed(false)}
          >
            <button onClick={() => setIsZoomed(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10000 }}>
              <X size={32} />
            </button>
            
            <div style={{ position: 'relative', flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
              {product.images.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); prevImg(); }} style={{ position: 'absolute', left: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', padding: '1rem', cursor: 'pointer', display: 'flex', zIndex: 10 }}>
                  <ChevronLeft size={32} />
                </button>
              )}
              
              <img src={product.images[activeImg].url} alt="Zoomed" style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain' }} />

              {product.images.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); nextImg(); }} style={{ position: 'absolute', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', padding: '1rem', cursor: 'pointer', display: 'flex', zIndex: 10 }}>
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {product.images.length > 1 && (
              <div style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={(e) => e.stopPropagation()}>
                {product.images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img.url} 
                    alt={`Thumbnail view ${i}`}
                    onClick={() => setActiveImg(i)}
                    style={{ 
                      height: '70px', 
                      width: '70px', 
                      objectFit: 'cover', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      border: activeImg === i ? '2px solid #D4AF37' : '2px solid transparent',
                      opacity: activeImg === i ? 1 : 0.5,
                      transition: 'all 0.2s',
                    }} 
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
