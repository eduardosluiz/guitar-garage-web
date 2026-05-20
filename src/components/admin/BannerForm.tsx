// src/components/admin/BannerForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

import PremiumAlert from './PremiumAlert';

interface BannerFormProps {
  initialData?: any;
}

export default function BannerForm({ initialData }: BannerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    ctaTexto: initialData?.ctaTexto || '',
    ctaLink: initialData?.ctaLink || '',
    imagemUrl: initialData?.imagemUrl || '',
    posicao: initialData?.posicao || 'guitarras',
    ordem: initialData?.ordem || 0,
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
    media: initialData?.media || []
  });

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

    // Se for alteração de posição e for um NOVO banner, verificar duplicidade
    if (name === 'posicao' && !initialData && value) {
      try {
        const res = await fetch(`/api/admin/banners/check-duplicate?posicao=${value}`);
        const data = await res.json();
        
        if (data.exists) {
          setAlertConfig({
            isOpen: true,
            type: 'warning',
            title: 'Banner Já Existente',
            message: `Já existe um banner ativo para a posição "${data.banner.titulo || value}". O sistema recomenda editar o conteúdo existente para evitar duplicidade no site.`,
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
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/banners', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id,
          ordem: parseInt(formData.ordem.toString()) || 0,
          preTitulo: formData.preTitulo || '',
          titulo: formData.titulo || '',
          subtitulo: formData.subtitulo || '',
          ctaTexto: formData.ctaTexto || '',
          ctaLink: formData.ctaLink || ''
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
    } catch (error: any) {
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
            router.push(`/admin/banners/${alertConfig.bannerId}`);
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
        <h2>{initialData ? 'Editar Banner de Topo' : 'Novo Banner de Topo (Hero)'}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Banner'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Local e Conteúdo Visual</h3>
            
            <div className={styles.inputGroup}>
              <label>Página onde o Banner aparecerá</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                <optgroup label="Banners de Topo (Hero)">
                  <option value="novidades">Página: Novidades (Top)</option>
                  <option value="guitarras">Categoria: Guitarras (Top)</option>
                  <option value="baixos">Categoria: Baixos (Top)</option>
                  <option value="amplificadores">Categoria: Amps (Top)</option>
                  <option value="violoes">Categoria: Violões (Top)</option>
                  <option value="pedais">Categoria: Pedais (Top)</option>
                  <option value="vintage">Categoria: Vintage (Top)</option>
                </optgroup>

                <optgroup label="Páginas de Serviços (Top)">
                  <option value="servicos">Página: Serviços (Hero)</option>
                  <option value="lutheria">Página: Lutheria (Hero)</option>
                  <option value="aulas">Página: Aulas (Hero)</option>
                </optgroup>

                <optgroup label="Institucional">
                  <option value="sobre">Página: Sobre a Garage</option>
                  <option value="depoimentos">Página: Depoimentos</option>
                </optgroup>
              </select>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Texto Auxiliar (Amarelo)</label>
              <input type="text" name="preTitulo" value={formData.preTitulo} onChange={handleChange} placeholder="Ex: ESTOQUE DISPONÍVEL" />
            </div>
            <div className={styles.inputGroup}>
              <label>Título Principal do Banner</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ex: RARIDADES VINTAGE" />
            </div>
            <div className={styles.inputGroup}>
              <label>Subtítulo / Descrição Curta</label>
              <input type="text" name="subtitulo" value={formData.subtitulo} onChange={handleChange} placeholder="Ex: Confira as novas raridades que chegaram." />
            </div>
            <div className={styles.inputGroup}>
              <label>Imagem de Fundo (Horizontal High-Res)</label>
              <MediaUpload 
                value={formData.media} 
                onChange={handleMediaChange}
                onlyImages={true}
              />
            </div>
          </div>
        </div>

            <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3><Info size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Informações</h3>
            <p style={{ fontSize: '0.8rem', color: '#878a99', lineHeight: '1.6' }}>
              Esta seção gerencia os <strong>Banners de Topo (Hero)</strong> das páginas do site.
              <br /><br />
              <strong>Atenção:</strong> O banner da página de <em>Custom Pickups (Tones)</em> agora é gerenciado exclusivamente no novo menu <strong>Tones</strong>.
              <br /><br />
              Se uma página não tiver um banner cadastrado, o sistema exibirá automaticamente o fundo preto padrão da Guitar Garage.
            </p>
            <div className={styles.checkboxGroup} style={{ marginTop: '2rem' }}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Banner Ativo
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

