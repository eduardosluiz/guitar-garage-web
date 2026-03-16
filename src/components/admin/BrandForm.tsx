// src/components/admin/BrandForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import styles from './ProductForm.module.css';

interface BrandFormProps {
  initialData?: any;
}

export default function BrandForm({ initialData }: BrandFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    slug: initialData?.slug || '',
  });
  
  // Usando estado separado para o logo, seguindo o padrão que funcionou nos produtos
  const [logoUrl, setLogoUrl] = useState<string>(initialData?.logo_url || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'nome' && !initialData) {
      const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/marcas', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id,
          logo_url: logoUrl // Enviando o link da imagem corretamente
        }),
      });

      if (response.ok) {
        router.push('/admin/marcas');
        router.refresh();
      } else {
        alert('Erro ao salvar marca');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar marca');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Marca' : 'Nova Marca'}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Marca'}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <label>Nome da Marca</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Fender" />
        </div>
        <div className={styles.inputGroup}>
          <label>Slug (URL)</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="fender" />
        </div>
        <div className={styles.inputGroup}>
          <label>Logotipo da Marca</label>
          <ImageUpload 
            value={logoUrl ? [logoUrl] : []} 
            onChange={(url) => setLogoUrl(url)}
            onRemove={() => setLogoUrl('')}
          />
        </div>
      </div>
    </form>
  );
}
