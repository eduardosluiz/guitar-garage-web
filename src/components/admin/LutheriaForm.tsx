// src/components/admin/LutheriaForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, ArrowLeft, Video } from 'lucide-react';
import ImageUpload from './ImageUpload';
import styles from './ProductForm.module.css';

interface LutheriaFormProps {
  initialData?: any;
}

export default function LutheriaForm({ initialData }: LutheriaFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || '',
    slug: initialData?.slug || '',
    descricao: initialData?.descricao || '',
    videoUrl: initialData?.videoUrl || '',
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
  });

  const [images, setImages] = useState<string[]>(initialData?.imagens?.map((img: any) => img.url) || []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));

    if (name === 'titulo' && !initialData) {
      const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert('Adicione pelo menos uma imagem ao projeto');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/lutheria', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: initialData?.id, images }),
      });

      if (response.ok) {
        router.push('/admin/lutheria');
        router.refresh();
      } else {
        alert('Erro ao salvar projeto');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="button" onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#878a99', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <h2>{initialData ? 'Editar Projeto' : 'Novo Projeto de Lutheria'}</h2>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Projeto'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Detalhes do Projeto</h3>
            <div className={styles.inputGroup}>
              <label>Título do Projeto</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required placeholder="Ex: Restauração Fender Stratocaster 60s" />
            </div>
            <div className={styles.inputGroup}>
              <label>Slug (URL)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="ex-restauracao-fender" />
            </div>
            <div className={styles.inputGroup}>
              <label>Descrição do Trabalho</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={8} placeholder="Conte a história desse projeto e o que foi feito..." />
            </div>
          </div>

          <div className={styles.card}>
            <h3>Galeria do Projeto</h3>
            <ImageUpload 
              value={images} 
              onChange={(url) => setImages([...images, url])}
              onRemove={(url) => setImages(images.filter((img) => img !== url))}
            />
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3>Mídia Adicional</h3>
            <div className={styles.inputGroup}>
              <label><Video size={14} style={{ marginRight: '0.5rem' }} /> URL do Vídeo (YouTube/Vimeo)</label>
              <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
            </div>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Projeto Visível no Site
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
