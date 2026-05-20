// src/components/admin/TonesForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info, Music, Image as ImageIcon, AlertCircle, Zap } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductForm.module.css';

import PremiumAlert from './PremiumAlert';

interface TonesFormProps {
  initialData?: any;
}

export default function TonesForm({ initialData }: TonesFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{ 
    isOpen: boolean, 
    type: 'warning' | 'error',
    title: string,
    message: string,
    bannerId?: number,
    confirmText?: string,
    cancelText?: string
  }>({ 
    isOpen: false, 
    type: 'warning',
    title: '',
    message: ''
  });

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
    if (isMounted && !initialData && (formData.posicao.startsWith('card-') || formData.posicao === 'custom-pickups') && hasChangedPosition) {
      const checkExisting = async () => {
        try {
          const response = await fetch(`/api/admin/banners/check-duplicate?posicao=${formData.posicao}`);
          if (response.ok) {
            const data = await response.json();
            if (data.exists) {
              setAlertConfig({
                isOpen: true,
                type: 'warning',
                title: 'Conteúdo Já Existente',
                message: `Já existe um conteúdo cadastrado para a posição "${data.banner.titulo || formData.posicao}". Recomendamos editar o existente para manter a organização.`,
                bannerId: data.banner.id
              });
            }
          }
        } catch (error) {
          console.error("Erro ao verificar duplicatas", error);
        }
      };
      checkExisting();
    }
  }, [formData.posicao, initialData, isMounted, hasChangedPosition]);

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

    // Garantir que a lista de mídias seja única
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    if (name === 'posicao') setHasChangedChangedPosition(true);
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isToneDetailPosition && !formData.imagemUrl && formData.media.length === 0) {
      setAlertConfig({
        isOpen: true,
        type: 'error',
        title: 'Imagem Obrigatória',
        message: 'Você precisa adicionar uma imagem para Banners ou Cards.',
        confirmText: 'ENTENDI'
      });
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
          preTitulo: formData.preTitulo || '',
          titulo: formData.titulo || '',
          subtitulo: formData.subtitulo || '',
          ctaTexto: '',
          ctaLink: '',
          ordem: 0
        }),
      });

      if (response.ok) {
        router.push('/admin/tones');
        router.refresh();
      } else {
        const errorText = await response.text();
        setAlertConfig({
          isOpen: true,
          type: 'error',
          title: 'Erro ao Salvar',
          message: errorText || 'Erro interno no servidor ao processar Tones.',
          confirmText: 'TENTAR NOVAMENTE'
        });
      }
    } catch (error) {
      console.error(error);
      setAlertConfig({
        isOpen: true,
        type: 'error',
        title: 'Falha na Conexão',
        message: 'Não foi possível conectar ao servidor.',
        confirmText: 'FECHAR'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PremiumAlert 
        isOpen={alertConfig.isOpen}
        type={alertConfig.type}
        onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={() => {
          if (alertConfig.type === 'warning' && alertConfig.bannerId) {
            router.push(`/admin/tones/${alertConfig.bannerId}`);
          } else {
            setAlertConfig(prev => ({ ...prev, isOpen: false }));
          }
        }}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
      />

      <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isBannerPosition ? (
            <ImageIcon className="text-gold" size={32} />
          ) : isToneDetailPosition ? (
            <Music className="text-gold" size={32} />
          ) : (
            <Zap className="text-gold" size={32} />
          )}
          <div>
            <h2 style={{ margin: 0 }}>
              {initialData ? 'Editar' : 'Novo'} {isBannerPosition ? 'Banner Pickups' : isToneDetailPosition ? 'Sample de Áudio' : 'Card Pickups'}
            </h2>
            <p style={{ fontSize: '0.7rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isBannerPosition ? 'Banner de Topo da Página de Tones' : isToneDetailPosition ? 'Arquivos de Demonstração Sonora' : 'Card de Listagem da Grade'}
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
              <label>Onde este conteúdo aparecerá?</label>
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

            {!isToneDetailPosition && (
              <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
                <label>Texto Auxiliar (Amarelo)</label>
                <input 
                  type="text" 
                  name="preTitulo" 
                  value={formData.preTitulo} 
                  onChange={handleChange} 
                  placeholder="Ex: GG CUSTOM SHOP" 
                />
              </div>
            )}

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>
                {isToneDetailPosition 
                  ? 'Nome do Sample (Ex: Neck Pickup - Clean)' 
                  : 'Título Principal'}
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
                <label>Descrição / Texto Curto</label>
                <textarea 
                  name="subtitulo" 
                  value={formData.subtitulo} 
                  onChange={handleChange}
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
              <strong>Dica:</strong> Para o <strong>Banner Principal</strong>, utilize imagens de altíssima resolução. Para <strong>Cards</strong>, utilize fotos dos sets de captadores.
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
    </>
  );
}
