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
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBanners = initialBanners.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'home') return b.posicao === 'home';
    if (filter === 'destaque') return b.posicao !== 'home';
    return true;
  });

  if (!mounted) return <div style={{ minHeight: '400px' }} />;

  return (
    <>
      {/* Botões de Ação reposicionados */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
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
            padding: '0 1.2rem',
            gap: '0.6rem'
          }}
        >
          <PlusCircle size={14} /> 
          <span className="desktop-text">IMAGEM DESTAQUE</span>
          <span className="mobile-text">DESTAQUE</span>
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
            padding: '0 1.2rem',
            gap: '0.6rem'
          }}
        >
          <PlusCircle size={14} /> 
          <span className="desktop-text">BANNER HOME</span>
          <span className="mobile-text">HOME</span>
        </Link>
      </div>

      <div style={{ 
        backgroundColor: '#1a1d21', 
        padding: '1rem 1.5rem', 
        border: '1px solid rgba(255,255,255,0.05)', 
        borderRadius: '4px', 
        marginBottom: '2rem', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '0.7rem', color: '#878a99', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
          Filtrar por:
        </span>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as any)}
          style={{
            backgroundColor: '#2a2f34',
            border: '1px solid #32383e',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '200px'
          }}
        >
          <option value="all">TODOS OS ITENS</option>
          <option value="home">APENAS BANNERS HOME</option>
          <option value="destaque">APENAS IMAGENS DESTAQUE</option>
        </select>
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
