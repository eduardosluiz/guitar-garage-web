// src/components/admin/CategoryForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import styles from './ProductForm.module.css';

interface CategoryFormProps {
  initialData?: any;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    slug: initialData?.slug || '',
  });

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
      const response = await fetch('/api/admin/categorias', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: initialData?.id }),
      });

      if (response.ok) {
        router.push('/admin/categorias');
        router.refresh();
      } else {
        alert('Erro ao salvar categoria');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar categoria');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Categoria' : 'Nova Categoria'}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Categoria'}
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <label>Nome da Categoria</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Guitarras Elétricas" />
        </div>
        <div className={styles.inputGroup}>
          <label>Slug (URL)</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="guitarras-eletricas" />
        </div>
      </div>
    </form>
  );
}
