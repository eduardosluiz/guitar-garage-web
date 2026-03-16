"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { Phone, ArrowLeft, ShieldCheck, Truck, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProdutoDetalhe() {
  const [activeImg, setActiveImg] = useState(0);

  const product = {
    name: "Gretsch 6120 Nashville Classic",
    brand: "GRETSCH",
    price: "R$ 24.900",
    installments: "ou 12x de R$ 2.450,00",
    status: "DISPONÍVEL",
    year: "2018",
    condition: "EXCELENTE",
    weight: "3.4 kg",
    description: "Uma verdadeira joia do timbre. Esta Gretsch 6120 Nashville oferece o som clássico de 'twang' que definiu gerações. Em estado de nova, com case original e certificado de autenticidade.",
    specs: [
      { label: "Corpo", value: "Maple Laminado Arqueado" },
      { label: "Braço", value: "Maple com Perfil em U" },
      { label: "Escala", value: "Rosewood com Raio de 12\"" },
      { label: "Captadores", value: "High Sensitive Filter'Tron" },
      { label: "Ponte", value: "Bigsby B6G Vibrato Tailpiece" },
      { label: "Case", value: "Original Gretsch Deluxe Hardshell" }
    ],
    images: [
      "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=1200",
      "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=1200",
      "https://images.unsplash.com/photo-1525201548942-d8b8967d0f5c?q=80&w=1200"
    ]
  };

  const nextImg = () => setActiveImg((prev) => (prev + 1) % product.images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);

  const WHATSAPP_URL = `https://wa.me/5551991898846?text=Olá, tenho interesse na ${product.name}`;

  return (
    <main className={styles.main}>
      <Header />

      <section className={styles.container}>
        <div className={styles.backNav}>
          <Link href="/opcao-b" className={styles.backLink}>
            <ArrowLeft size={16} /> VOLTAR PARA O ESTOQUE
          </Link>
        </div>

        <div className={styles.contentLayout}>
          {/* COLUNA ESQUERDA: CARROSSEL DE IMAGENS */}
          <div className={styles.galleryCol}>
            <div className={styles.mainImageContainer}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImg}
                  src={product.images[activeImg]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={styles.mainImg}
                />
              </AnimatePresence>
              
              <button onClick={prevImg} className={styles.carouselBtn} style={{ left: '1rem' }}><ChevronLeft /></button>
              <button onClick={nextImg} className={styles.carouselBtn} style={{ right: '1rem' }}><ChevronRight /></button>
            </div>

            {/* MINIATURAS */}
            <div className={styles.thumbnailGrid}>
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA: INFORMAÇÕES */}
          <aside className={styles.infoCol}>
            <div className={styles.stickyContent}>
              <span className={styles.brandTag}>{product.brand}</span>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.statusBadge}>{product.status}</div>

              <div className={styles.priceContainer}>
                <span className={styles.price}>{product.price}</span>
                <p className={styles.installments}>{product.installments}</p>
              </div>

              <p className={styles.description}>{product.description}</p>

              <a href={WHATSAPP_URL} target="_blank" className={styles.ctaButton}>
                <Phone size={18} fill="currentColor" />
                TENHO INTERESSE
              </a>

              <div className={styles.benefits}>
                <div className={styles.benefitItem}><ShieldCheck size={18} color="#D4AF37" /><span>Autenticidade Garantida</span></div>
                <div className={styles.benefitItem}><Truck size={18} color="#D4AF37" /><span>Envio Seguro</span></div>
              </div>

              <div className={styles.specsSection}>
                <h3>DETALHES TÉCNICOS</h3>
                <div className={styles.specsGrid}>
                  <div className={styles.specRow}><span>Ano:</span> <strong>{product.year}</strong></div>
                  <div className={styles.specRow}><span>Condição:</span> <strong>{product.condition}</strong></div>
                  {product.specs.map((spec, i) => (
                    <div key={i} className={styles.specRow}><span>{spec.label}:</span> <strong>{spec.value}</strong></div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
