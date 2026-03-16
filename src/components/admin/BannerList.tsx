// src/components/admin/BannerList.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit2, EyeOff } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import styles from '@/app/admin/banners/page.module.css';

interface BannerListProps {
  initialBanners: any[];
}

export default function BannerList({ initialBanners }: BannerListProps) {
  const [filter, setFilter] = useState<'all' | 'home' | 'destaque'>('all');

  const filteredBanners = initialBanners.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'home') return b.posicao === 'home';
    if (filter === 'destaque') return b.posicao !== 'home';
    return true;
  });

  return (
    <>
      <div style={{ 
        backgroundColor: '#1a1d21', 
        padding: '1.2rem 2rem', 
        border: '1px solid rgba(255,255,255,0.05)', 
        borderRadius: '4px', 
        marginBottom: '3rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button 
            onClick={() => setFilter('all')} 
            className="btn-boutique-outline" 
            style={{ 
              fontSize: '0.65rem', 
              height: '38px', 
              borderColor: filter === 'all' ? 'var(--gold)' : 'rgba(255,255,255,0.1)', 
              color: filter === 'all' ? 'var(--gold)' : '#fff', 
              opacity: filter === 'all' ? 1 : 0.5,
              padding: '0 1.5rem'
            }}
          >
            TODOS
          </button>
          <button 
            onClick={() => setFilter('home')} 
            className="btn-boutique-outline" 
            style={{ 
              fontSize: '0.65rem', 
              height: '38px', 
              borderColor: filter === 'home' ? 'var(--gold)' : 'rgba(255,255,255,0.1)', 
              color: filter === 'home' ? 'var(--gold)' : '#fff', 
              opacity: filter === 'home' ? 1 : 0.5,
              padding: '0 1.5rem'
            }}
          >
            BANNERS HOME
          </button>
          <button 
            onClick={() => setFilter('destaque')} 
            className="btn-boutique-outline" 
            style={{ 
              fontSize: '0.65rem', 
              height: '38px', 
              borderColor: filter === 'destaque' ? 'var(--gold)' : 'rgba(255,255,255,0.1)', 
              color: filter === 'destaque' ? 'var(--gold)' : '#fff', 
              opacity: filter === 'destaque' ? 1 : 0.5,
              padding: '0 1.5rem'
            }}
          >
            IMAGENS DESTAQUE
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            href="/admin/banners/destaque/novo" 
            className="btn-boutique-outline" 
            style={{ 
              fontSize: '0.65rem', 
              height: '38px', 
              borderColor: 'rgba(212, 175, 55, 0.4)', 
              color: 'var(--gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1.5rem',
              gap: '0.6rem'
            }}
          >
            <PlusCircle size={14} /> IMAGEM DESTAQUE
          </Link>
          <Link 
            href="/admin/banners/novo" 
            className="btn-boutique" 
            style={{ 
              fontSize: '0.65rem', 
              height: '38px', 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 1.5rem',
              gap: '0.6rem'
            }}
          >
            <PlusCircle size={14} /> BANNER HOME
          </Link>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredBanners.length > 0 ? (
          filteredBanners.map((b) => (
            <div key={b.id} className={`${styles.card} ${!b.isAtivo ? styles.inactive : ''}`}>
              <div className={styles.preview}>
                <img src={b.imagemUrl} alt={b.titulo || 'Banner'} />
                {!b.isAtivo && (
                  <div className={styles.statusOverlay}>
                    <EyeOff size={32} /> <span>OCULTO NO SITE</span>
                  </div>
                )}
              </div>
              
              <div className={styles.info}>
                <div className={styles.infoTop}>
                  <span className={styles.tagPosicao}>
                    {b.posicao === 'home' ? 'Home' : b.posicao.replace('-', ' ')}
                  </span>
                  <span className={styles.ordem}>ORDEM #{b.ordem}</span>
                </div>
                <h3>{b.titulo || 'Untitled Content'}</h3>
                <p>{b.subtitulo || 'No description provided.'}</p>
              </div>

              <div className={styles.cardActions}>
                <Link href={`/admin/banners/${b.id}`} title="Editar" className={styles.actionBtn}>
                  <Edit2 size={16} />
                </Link>
                <DeleteButtonGeneral id={b.id} resource="banners" />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Nenhum item encontrado para este filtro.</div>
        )}
      </div>
    </>
  );
}
