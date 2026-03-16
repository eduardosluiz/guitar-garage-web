// src/components/admin/LutheriaForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, ArrowLeft } from 'lucide-react';
import MediaUpload from '@/components/admin/MediaUpload'; 
import styles from '@/components/admin/ProductForm.module.css';

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
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
  });

  // A galeria agora pode conter URLs de fotos e vídeos
  const [media, setMedia] = useState<string[]>(initialData?.imagens?.map((img: any) => img.url) || []);

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
    if (media.length === 0) {
      alert('Adicione pelo menos uma foto ou vídeo ao projeto');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/lutheria', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id, 
          images: media // Enviamos tudo na mesma galeria
        }),
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
            <h3>Galeria de Mídia (Fotos e Vídeos)</h3>
            <p style={{ fontSize: '0.75rem', color: '#878a99', marginBottom: '1.5rem' }}>
              Você pode subir fotos e arquivos de vídeo (.mp4, .mov) para mostrar o processo.
            </p>
            <MediaUpload 
              value={media} 
              onChange={(url) => setMedia((prev) => [...prev, url])}
              onRemove={(url) => setMedia((prev) => prev.filter((m) => m !== url))}
              acceptVideo={true}
            />
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3>Visibilidade</h3>
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
