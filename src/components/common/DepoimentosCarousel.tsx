"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Depoimento {
  id: number;
  nome: string;
  email: string | null;
  texto: string;
  createdAt: Date | string;
}

interface Props {
  depoimentos: Depoimento[];
}

export default function DepoimentosCarousel({ depoimentos }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 1024 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(depoimentos.length / itemsPerPage);

  const next = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const visibleItems = depoimentos.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div style={{ position: 'relative', marginTop: '2rem' }}>
      {/* Controles no Topo */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '1rem', 
          marginBottom: '2rem',
          alignItems: 'center',
          paddingRight: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', letterSpacing: '2px', marginRight: '1rem' }}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={prev} 
              style={{ 
                background: '#111', 
                color: '#fff', 
                border: 'none', 
                width: '45px', 
                height: '45px', 
                borderRadius: '50%', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111'}
            >
              <ChevronLeft size={20} />
            </button>

            <button 
              onClick={next} 
              style={{ 
                background: '#111', 
                color: '#fff', 
                border: 'none', 
                width: '45px', 
                height: '45px', 
                borderRadius: '50%', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: itemsPerPage === 2 ? '1fr 1fr' : '1fr', 
        gap: '2rem',
        minHeight: '350px'
      }}>
        <AnimatePresence mode="wait">
          {visibleItems.map((dep) => (
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ 
                backgroundColor: '#fcfcfc', 
                padding: '3rem', 
                border: '1px solid #eee', 
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ color: '#D4AF37', marginBottom: '1.5rem', display: 'flex', gap: '6px', fontSize: '1.4rem' }}>
                  {'★'.repeat(5)}
                </div>
                <p style={{ 
                  fontStyle: 'italic', 
                  color: '#333', 
                  lineHeight: 1.8, 
                  marginBottom: '2rem', 
                  fontSize: '1.15rem' 
                }}>
                  "{dep.texto}"
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.95rem', color: '#111' }}>
                    {dep.nome}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                    {dep.email ? 'Cliente Especial' : 'Cliente Guitar Garage'}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#aaa', fontWeight: 700, letterSpacing: '1px' }}>
                  {new Date(dep.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
