// src/components/admin/BannerForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

interface BannerFormProps {
  initialData?: any;
}

export default function BannerForm({ initialData }: BannerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || '',
    subtitulo: initialData?.subtitulo || '',
    ctaTexto: initialData?.ctaTexto || '',
    ctaLink: initialData?.ctaLink || '',
    imagemUrl: initialData?.imagemUrl || '',
    posicao: initialData?.posicao || 'home',
    ordem: initialData?.ordem || 0,
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
  });

  const bannerMedia: MediaItem[] = formData.imagemUrl ? [{ url: formData.imagemUrl, ordem: 0 }] : [];

  const handleMediaChange = (items: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => {
    const newItems = typeof items === 'function' ? items(bannerMedia) : items;
    const latestUrl = newItems[newItems.length - 1]?.url || '';
    setFormData(prev => ({ ...prev, imagemUrl: latestUrl }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imagemUrl) {
      alert('A imagem do banner é obrigatória');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('/api/admin/banners', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: initialData?.id }),
      });

      if (response.ok) {
        router.push('/admin/banners');
        router.refresh();
      } else {
        alert('Erro ao salvar banner');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Banner' : 'Novo Banner'}</h2>
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
            <h3>Conteúdo Visual</h3>
            <div className={styles.inputGroup}>
              <label>Título do Banner</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ex: NOVIDADES 2026" />
            </div>
            <div className={styles.inputGroup}>
              <label>Subtítulo / Descrição Curta</label>
              <input type="text" name="subtitulo" value={formData.subtitulo} onChange={handleChange} placeholder="Ex: Confira as novas raridades que chegaram." />
            </div>
            <div className={styles.inputGroup}>
              <label>Imagem do Banner (High-Res)</label>
              <MediaUpload 
                value={bannerMedia} 
                onChange={handleMediaChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3>Link e Ordem</h3>
            <div className={styles.inputGroup}>
              <label>Local de Exibição</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                <optgroup label="Home e Gerais">
                  <option value="home">Home - Carrossel</option>
                  <option value="estoque">Página: Todo o Estoque</option>
                  <option value="novidades">Página: Novidades</option>
                  <option value="sobre">Página: Sobre a Garage</option>
                </optgroup>
                <optgroup label="Categorias de Produtos">
                  <option value="guitarras">Categoria: Guitarras</option>
                  <option value="baixos">Categoria: Baixos</option>
                  <option value="amps">Categoria: Amps</option>
                  <option value="violoes">Categoria: Violões</option>
                  <option value="pedais">Categoria: Pedais</option>
                  <option value="custom-shop">Categoria: Custom Shop</option>
                  <option value="reliquias">Categoria: Relíquias</option>
                </optgroup>
                <optgroup label="Páginas de Serviços">
                  <option value="lutheria">Serviço: Lutheria</option>
                  <option value="pickups">Serviço: Custom Pickups</option>
                  <option value="aulas">Serviço: Aulas</option>
                </optgroup>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Texto do Botão (CTA)</label>
              <input type="text" name="ctaTexto" value={formData.ctaTexto} onChange={handleChange} placeholder="Ex: VER AGORA" />
            </div>
            <div className={styles.inputGroup}>
              <label>Link do Botão</label>
              <input type="text" name="ctaLink" value={formData.ctaLink} onChange={handleChange} placeholder="Ex: /categoria/novidades" />
            </div>
            <div className={styles.inputGroup}>
              <label>Ordem de Exibição</label>
              <input type="number" name="ordem" value={formData.ordem} onChange={handleChange} />
            </div>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Banner Ativo
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
