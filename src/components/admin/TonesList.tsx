// src/components/admin/TonesList.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit2, EyeOff, Music, Image as ImageIcon, Layout } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import styles from '@/app/admin/banners/page.module.css';

interface TonesListProps {
  initialTones: any[];
}

export default function TonesList({ initialTones }: TonesListProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'banner' | 'cards' | 'audios'>('all');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTones = initialTones.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'banner') return b.posicao === 'custom-pickups';
    if (filter === 'cards') return b.posicao.startsWith('card-');
    if (filter === 'audios') return ['two-tone', 'three-tone', 'buttertone'].includes(b.posicao);
    return true;
  });

  if (!mounted) return <div style={{ minHeight: '400px' }} />;

  return (
    <>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div 
          onClick={() => router.push('/admin/tones/novo')} 
          className="btn-boutique" 
          style={{ 
            fontSize: '0.75rem', 
            height: '48px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 1rem',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <PlusCircle size={18} /> 
          <span style={{ whiteSpace: 'nowrap' }}>ADICIONAR NOVO CONTEÚDO TONES</span>
        </div>
        <div style={{ 
          backgroundColor: '#1a1d21', 
          padding: '0 1.5rem', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '4px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#878a99', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Filtrar:
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
              <option value="all">TODOS OS TONES</option>
              <option value="banner">BANNER DE TOPO</option>
              <option value="cards">CARDS DE LISTAGEM</option>
              <option value="audios">SAMPLES DE ÁUDIO</option>
            </select>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#878a99', fontWeight: 700 }}>
            Total: {filteredTones.length}
          </span>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredTones.length > 0 ? (
          filteredTones.map((b) => (
            <div key={b.id} className={`${styles.card} ${!b.isAtivo ? styles.inactive : ''}`}>
              <div className={styles.preview}>
                {['two-tone', 'three-tone', 'buttertone'].includes(b.posicao) ? (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(45deg, #121417 0%, #1a1d21 100%)',
                    color: 'var(--gold)',
                    gap: '1rem'
                  }}>
                    <Music size={48} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>AUDIO SAMPLE</span>
                  </div>
                ) : (
                  <img src={b.imagemUrl} alt={b.titulo || 'Tone Content'} />
                )}
                {!b.isAtivo && (
                  <div className={styles.statusOverlay}>
                    <EyeOff size={32} /> <span>OCULTO NO SITE</span>
                  </div>
                )}
              </div>
              
              <div className={styles.info}>
                <div className={styles.infoTop}>
                  <span className={styles.tagPosicao} style={{ backgroundColor: b.posicao === 'custom-pickups' ? '#D4AF37' : '#2a2f34', color: b.posicao === 'custom-pickups' ? '#000' : '#fff' }}>
                    {b.posicao === 'custom-pickups' ? 'Banner Topo' : 
                     b.posicao.startsWith('card-') ? 'Card Listagem' : 'Audio Sample'}
                  </span>
                  <span className={styles.ordem}>
                    {b.posicao.includes('two-tone') ? 'TWO TONE' : 
                     b.posicao.includes('three-tone') ? 'THREE TONE' : 
                     b.posicao.includes('buttertone') ? 'BUTTERTONE' : 'GERAL'}
                  </span>
                </div>
                <h3>{b.titulo || 'Untitled Content'}</h3>
                <p>{b.subtitulo || 'No description provided.'}</p>
              </div>

              <div className={styles.cardActions}>
                <Link href={`/admin/tones/${b.id}`} title="Editar" className={styles.actionBtn}>
                  <Edit2 size={16} />
                </Link>
                <DeleteButtonGeneral id={b.id} resource="banners" />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Nenhum item de Tones encontrado.</div>
        )}
      </div>
    </>
  );
}
