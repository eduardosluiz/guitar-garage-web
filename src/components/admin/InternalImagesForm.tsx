// src/components/admin/InternalImagesForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

export default function InternalImagesForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    posicao: 'imagem-aulas',
    imagemUrl: '',
    titulo: '',
    subtitulo: '',
    isAtivo: true,
    media: [] as MediaItem[]
  });

  const handleMediaChange = (items: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => {
    const newItems = typeof items === 'function' ? items(formData.media) : items;
    setFormData(prev => ({ 
      ...prev, 
      media: newItems,
      imagemUrl: newItems.length > 0 ? newItems[newItems.length - 1].url : '' 
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagemUrl) {
      alert('A imagem é obrigatória');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          ordem: 0,
          ctaTexto: '',
          ctaLink: ''
        }),
      });

      if (response.ok) {
        router.push('/admin/banners');
        router.refresh();
      } else {
        alert('Erro ao salvar imagem interna');
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
      <div className={styles.header}>
        <h2>Nova Imagem Interna</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Imagem'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Local e Upload</h3>
            
            <div className={styles.inputGroup}>
              <label>Página onde a imagem aparecerá</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                <optgroup label="Serviços">
                  <option value="imagem-aulas">Página Aulas: Foto do Professor / Ambiente</option>
                  <option value="imagem-lutheria">Página Lutheria: Foto de Demonstração / Ambiente</option>
                </optgroup>
                <optgroup label="Institucional">
                  <option value="imagem-sobre">Página Sobre: Foto da Equipe / Loja</option>
                </optgroup>
              </select>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Título / Legenda (Opcional)</label>
              <input 
                type="text" 
                name="titulo" 
                value={formData.titulo} 
                onChange={handleChange} 
                placeholder="Ex: Prof. Rodrigo na Guitar Garage" 
              />
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Upload da Imagem</label>
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
              Esta seção gerencia imagens internas de destaque que não são banners de topo.
              <br /><br />
              <strong>Exemplo:</strong> A foto do professor na página de aulas ou fotos de demonstração de serviços.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
