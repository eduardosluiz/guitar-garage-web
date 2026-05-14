// src/components/admin/TonesForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info, Music, Image as ImageIcon, AlertCircle } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductForm.module.css';

interface TonesFormProps {
  initialData?: any;
}

export default function TonesForm({ initialData }: TonesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState<{ id: number, pos: string } | null>(null);
  
  const [formData, setFormData] = useState({
    preTitulo: initialData?.preTitulo || '',
    titulo: initialData?.titulo || '',
    subtitulo: initialData?.subtitulo || '',
    imagemUrl: initialData?.imagemUrl || '',
    posicao: initialData?.posicao || 'two-tone',
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
    media: initialData?.media || []
  });

  const [hasChangedPosition, setHasChangedChangedPosition] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Verificar duplicatas de Cards
  useEffect(() => {
    if (isMounted && !initialData && formData.posicao.startsWith('card-') && hasChangedPosition) {
      const checkExisting = async () => {
        try {
          const response = await fetch('/api/admin/banners');
          if (response.ok) {
            const banners = await response.json();
            const existing = banners.find((b: any) => b.posicao === formData.posicao);
            if (existing) {
              setShowDuplicateModal({ id: existing.id, pos: formData.posicao });
            }
          }
        } catch (error) {
          console.error("Erro ao verificar duplicatas", error);
        }
      };
      checkExisting();
    }
  }, [formData.posicao, initialData, isMounted, router, hasChangedPosition]);

  if (!isMounted) return null;

  const isToneDetailPosition = ['two-tone', 'three-tone', 'buttertone'].includes(formData.posicao);
  const isBannerPosition = formData.posicao === 'custom-pickups';

  const getInfoText = () => {
    if (isToneDetailPosition) return "Esta seção gerencia o CONTEÚDO INTERNO do captador. Aqui você adiciona os SAMPLES DE ÁUDIO que os clientes irão ouvir.";
    if (isBannerPosition) return "Esta seção gerencia o BANNER DE TOPO (Hero) da página de Pickups. Use imagens horizontais de alta resolução.";
    return "Esta seção gerencia os CARDS da página de listagem de Custom Pickups.";
  };

  const getPlaceholderTitle = () => {
    if (formData.posicao.includes('two-tone')) return "TWO TONE";
    if (formData.posicao.includes('three-tone')) return "THREE TONE";
    if (formData.posicao.includes('buttertone')) return "BUTTERTONE";
    if (formData.posicao === 'custom-pickups') return "GG CUSTOM HANDWOUND PICKUPS.";
    return "Ex: Título do Captador";
  };

  const getPlaceholderDesc = () => {
    if (formData.posicao.includes('two-tone')) return "Alma dos anos 60 com timbre cristalino e dinâmico.";
    if (formData.posicao.includes('three-tone')) return "O melhor timbre de Blues. Um set equilibrado com corpo e sustain excepcionais.";
    if (formData.posicao.includes('buttertone')) return "O clássico twang das Telecasters dos anos 50.";
    return "Descreva as características deste conteúdo...";
  };

  const handleMediaChange = (items: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => {
    const newItems = typeof items === 'function' ? items(formData.media) : items;
    
    // Garantir que a lista de mídias seja única e reflita exatamente o que o usuário quer
    const uniqueItems = Array.isArray(newItems) ? newItems : [];

    // Encontrar a primeira imagem para ser a capa
    const firstImage = uniqueItems.find(item => 
      item.url.endsWith('.jpg') || item.url.endsWith('.jpeg') || 
      item.url.endsWith('.png') || item.url.endsWith('.webp') ||
      !item.url.includes('/video/upload/')
    );

    setFormData(prev => ({ 
      ...prev, 
      media: uniqueItems,
      imagemUrl: firstImage?.url || uniqueItems[0]?.url || '' 
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    if (name === 'posicao') setHasChangedChangedPosition(true);
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isToneDetailPosition && !formData.imagemUrl && formData.media.length === 0) {
      alert('A imagem ou mídia é obrigatória');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/banners', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id,
          ctaTexto: '',
          ctaLink: '',
          ordem: 0
        }),
      });

      if (response.ok) {
        router.push('/admin/tones');
        router.refresh();
      } else {
        alert('Erro ao salvar conteúdo de Tones');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* MODAL DE DUPLICATA PREMIUM */}
      <AnimatePresence>
        {showDuplicateModal && (
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.85)', 
            backdropFilter: 'blur(8px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 9999,
            padding: '2rem'
          }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ 
                backgroundColor: '#1a1d21', 
                border: '1px solid var(--gold)', 
                borderRadius: '8px', 
                padding: '2.5rem', 
                maxWidth: '500px', 
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            >
              <AlertCircle size={48} color="var(--gold)" style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Space Grotesk' }}>CONTEÚDO JÁ EXISTENTE</h2>
              <p style={{ color: '#878a99', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Já existe um card cadastrado para a posição <strong>{showDuplicateModal.pos.replace('card-', '').toUpperCase()}</strong>. 
                Para evitar duplicidade e erros no site, você deve editar o card existente.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  type="button"
                  onClick={() => {
                    setShowDuplicateModal(null);
                    setFormData(prev => ({ ...prev, posicao: 'two-tone' }));
                  }}
                  className="btn-boutique-outline"
                  style={{ flex: 1 }}
                >
                  CANCELAR
                </button>
                <button 
                  type="button"
                  onClick={() => router.push(`/admin/tones/${showDuplicateModal.id}`)}
                  className="btn-boutique"
                  style={{ flex: 1 }}
                >
                  EDITAR EXISTENTE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Music className="text-gold" size={32} />
          <div>
            <h2 style={{ margin: 0 }}>{initialData ? 'Editar Conteúdo Tone' : 'Novo Conteúdo Tone'}</h2>
            <p style={{ fontSize: '0.7rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Gestão de Áudios, Cards e Banner de Pickups
            </p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Conteúdo'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Local e Definição</h3>
            <div className={styles.inputGroup}>
              <label>O que você está cadastrando?</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                <optgroup label="Banner de Topo">
                  <option value="custom-pickups">BANNER PRINCIPAL (Topo da Página)</option>
                </optgroup>

                <optgroup label="Cards de Listagem (Grade)">
                  <option value="card-two-tone">CARD: TWO TONE</option>
                  <option value="card-three-tone">CARD: THREE TONE</option>
                  <option value="card-buttertone">CARD: BUTTERTONE</option>
                </optgroup>
                
                <optgroup label="Conteúdo Interno (Samples de Áudio)">
                  <option value="two-tone">SAMPLES: TWO TONE</option>
                  <option value="three-tone">SAMPLES: THREE TONE</option>
                  <option value="buttertone">SAMPLES: BUTTERTONE</option>
                </optgroup>
              </select>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>
                {isToneDetailPosition 
                  ? 'Nome do Sample (Ex: Neck Pickup - Clean)' 
                  : 'Título do Conteúdo'}
              </label>
              <input 
                type="text" 
                name="titulo" 
                value={formData.titulo} 
                onChange={handleChange} 
                placeholder={isToneDetailPosition ? "Ex: Bridge Pickup - Overdrive" : getPlaceholderTitle()} 
              />
            </div>

            {!isToneDetailPosition && (
              <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
                <label>Descrição / Subtítulo</label>
                <textarea 
                  name="subtitulo" 
                  value={formData.subtitulo || ''} 
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitulo: e.target.value }))}
                  placeholder={getPlaceholderDesc()}
                  rows={4}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', fontFamily: 'inherit' }}
                />
              </div>
            )}

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Mídias</label>
              
              {isToneDetailPosition ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Music size={16} className="text-gold" />
                    <span style={{ fontSize: '0.7rem', color: '#3B82F6', fontWeight: 800, textTransform: 'uppercase' }}>Arquivo de Áudio (MP3/WAV)</span>
                  </div>
                  <MediaUpload 
                    value={formData.media} 
                    onChange={handleMediaChange}
                    onlyAudio={true}
                  />
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <ImageIcon size={16} className="text-gold" />
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase' }}>Imagem / Foto</span>
                  </div>
                  <MediaUpload 
                    value={formData.media} 
                    onChange={handleMediaChange}
                    onlyImages={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3><Info size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Instruções Tones</h3>
            <p style={{ fontSize: '0.8rem', color: '#878a99', lineHeight: '1.6' }}>
              {getInfoText()}
              <br /><br />
              <strong>Importante:</strong> Ao cadastrar um <strong>Sample de Áudio</strong>, o título que você definir será o nome que aparece ao lado do botão Play na página do produto.
            </p>
            <div className={styles.checkboxGroup} style={{ marginTop: '2rem' }}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Conteúdo Ativo no Site
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
