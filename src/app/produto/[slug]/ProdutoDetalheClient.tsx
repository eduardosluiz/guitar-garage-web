// src/app/produto/[slug]/ProdutoDetalheClient.tsx
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function ProdutoDetalheClient({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);

  const nextImg = () => setActiveImg((prev) => (prev + 1) % product.images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);

  const WHATSAPP_URL = `https://wa.me/555133313234?text=Olá, tenho interesse na ${product.name}`;

  return (
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
  );
}
