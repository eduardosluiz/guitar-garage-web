// src/components/admin/DestaqueForm.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

import PremiumAlert from './PremiumAlert';

interface DestaqueFormProps {
  initialData?: any;
}

export default function DestaqueForm({ initialData }: DestaqueFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBannerPath, setIsBannerPath] = useState(false);
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
    posicao: initialData?.posicao || 'servicos-lutheria',
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
    media: initialData?.media || []
  });

  useEffect(() => {
    setIsMounted(true);
    const bannerPath = window.location.pathname.includes('/admin/banners/novo') || (initialData && ['lutheria', 'aulas'].includes(initialData.posicao));
    setIsBannerPath(!!bannerPath);
    if (bannerPath && !initialData) {
      setFormData(prev => ({ ...prev, posicao: 'lutheria' }));
    }
  }, [initialData]);

  if (!isMounted) return null;

  const getInfoText = () => {
    if (isBannerPath) return "Esta seção gerencia o BANNER DE TOPO (Hero) das páginas. Use imagens horizontais de alta resolução.";
    return "Esta seção gerencia as imagens de destaque (CARDS) das páginas de listagem.";
  };

  const getPlaceholderTitle = () => {
    // Lutheria
    if (formData.posicao === 'lutheria') return "LUTHERIA DE ALTA PERFORMANCE.";
    if (formData.posicao === 'servicos-lutheria') return "LUTHERIA ESPECIALIZADA";
    
    // Pickups
    if (formData.posicao === 'servicos-pickups') return "GG GUITARRAS E PICKUPS";
    
    // Aulas
    if (formData.posicao === 'aulas') return "AULAS DE GUITARRA";
    if (formData.posicao === 'servicos-aulas') return "AULAS DE GUITARRA";
    
    return "Ex: Foto Principal Lutheria";
  };

  const getPlaceholderDesc = () => {
    // Descrições dos Cards de Serviço
    if (formData.posicao === 'servicos-lutheria') return "Mão de obra e ferramentas especializadas. Excelência, sensibilidade e cuidado no trato com instrumentos, sejam eles de entrada ou de alto valor.";
    if (formData.posicao === 'servicos-pickups') return "Primeiro fabricante de captadores estilo vintage do Brasil. Produtos desenvolvidos desde 2004 baseados em originais 'Pré CBS'.";
    if (formData.posicao === 'servicos-aulas') return "Mentoria personalizada imersiva em um ambiente cercado pelos melhores instrumentos e amps.";
    
    return "Descreva as características deste conteúdo...";
  };

  const handleMediaChange = (items: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => {
    const newItems = typeof items === 'function' ? items(formData.media) : items;
    
    // Encontrar a primeira imagem para ser a capa
    const firstImage = newItems.find(item => 
      item.url.endsWith('.jpg') || item.url.endsWith('.jpeg') || 
      item.url.endsWith('.png') || item.url.endsWith('.webp') ||
      !item.url.includes('/video/upload/')
    );

    setFormData(prev => ({ 
      ...prev, 
      media: newItems,
      imagemUrl: firstImage?.url || newItems[0]?.url || '' 
    }));
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));

    // Verificação de duplicidade para Novos itens
    if (name === 'posicao' && !initialData && value) {
      try {
        const res = await fetch(`/api/admin/banners/check-duplicate?posicao=${value}`);
        const data = await res.json();
        
        if (data.exists) {
          setAlertConfig({
            isOpen: true,
            type: 'warning',
            title: 'Conteúdo Já Existente',
            message: `Já existe um conteúdo ativo para a posição "${data.banner.titulo || value}". Recomendamos editar o existente para manter a organização do site.`,
            bannerId: data.banner.id
          });
        }
      } catch (error) {
        console.error('Erro ao verificar duplicidade:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagemUrl && formData.media.length === 0) {
      setAlertConfig({
        isOpen: true,
        type: 'error',
        title: 'Campo Obrigatório',
        message: 'A imagem ou mídia é obrigatória para salvar este conteúdo.',
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
        router.push('/admin/banners');
        router.refresh();
      } else {
        const errorText = await response.text();
        setAlertConfig({
          isOpen: true,
          type: 'error',
          title: 'Erro ao Salvar',
          message: errorText || 'Ocorreu um erro interno no servidor.',
          confirmText: 'TENTAR NOVAMENTE'
        });
      }
    } catch (error) {
      setAlertConfig({
        isOpen: true,
        type: 'error',
        title: 'Falha na Conexão',
        message: 'Não foi possível conectar ao servidor. Verifique sua internet.',
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
            const isServiceCard = ['servicos-lutheria', 'servicos-pickups', 'servicos-aulas'].includes(formData.posicao);
            if (isServiceCard) {
              router.push(`/admin/banners/destaque/${alertConfig.bannerId}`);
            } else {
              router.push(`/admin/banners/${alertConfig.bannerId}`);
            }
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
        <h2>{initialData ? 'Editar Conteúdo' : (isBannerPath ? 'Novo Banner de Topo' : 'Novo Destaque (Card/Interno)')}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Local e Conteúdo</h3>
            <div className={styles.inputGroup}>
              <label>Onde este conteúdo aparecerá?</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                {isBannerPath ? (
                  <optgroup label="Banners de Topo (Hero)">
                    <option value="lutheria">Banner: PÁGINA LUTHERIA</option>
                    <option value="aulas">Banner: PÁGINA AULAS</option>
                  </optgroup>
                ) : (
                  <>
                    <optgroup label="Cards da Página de Serviços">
                      <option value="servicos-lutheria">Card: LUTHERIA</option>
                      <option value="servicos-pickups">Card: PICKUPS & CUSTOM</option>
                      <option value="servicos-aulas">Card: AULAS</option>
                    </optgroup>
                  </>
                )}
              </select>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Título do Conteúdo</label>
              <input 
                type="text" 
                name="titulo" 
                value={formData.titulo} 
                onChange={handleChange} 
                placeholder={getPlaceholderTitle()} 
              />
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Descrição (Texto da Página/Card)</label>
              <textarea 
                name="subtitulo" 
                value={formData.subtitulo} 
                onChange={handleChange}
                placeholder={getPlaceholderDesc()}
                rows={4}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd', fontFamily: 'inherit' }}
              />
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Mídias</label>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, display: 'block', marginBottom: '1rem', textTransform: 'uppercase' }}>Imagem / Foto</span>
                <MediaUpload 
                  value={formData.media} 
                  onChange={handleMediaChange}
                  onlyImages={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3><Info size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Instruções</h3>
            <p style={{ fontSize: '0.8rem', color: '#878a99', lineHeight: '1.6' }}>
              {getInfoText()}
              <br /><br />
              <strong>Dica:</strong> Mantenha os textos objetivos para não quebrar o layout premium.
            </p>
            <div className={styles.checkboxGroup} style={{ marginTop: '2rem' }}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Conteúdo Ativo
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}
