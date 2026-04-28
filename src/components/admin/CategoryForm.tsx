// src/components/admin/CategoryForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
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
    linkDestino: initialData?.linkDestino || '',
  });

  const [imagemMedia, setImagemMedia] = useState<MediaItem[]>(
    initialData?.imagemUrl ? [{ url: initialData.imagemUrl, ordem: 0 }] : []
  );

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
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id,
          imagemUrl: imagemMedia[0]?.url || ''
        }),
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
          <label>Página de Destino (Opcional - substitui a navegação padrão)</label>
          <select name="linkDestino" value={formData.linkDestino} onChange={handleChange as any}>
            <option value="">-- Usar formato padrão (/categoria/slug) --</option>
            <optgroup label="Páginas Gerais">
              <option value="/estoque">Página: Todo o Estoque</option>
              <option value="/novidades">Página: Novidades</option>
              <option value="/sobre">Página: Sobre a Garage</option>
              <option value="/depoimentos">Página: Depoimentos</option>
            </optgroup>
            <optgroup label="Categorias Específicas">
              <option value="/categoria/guitarras">Página: Guitarras</option>
              <option value="/categoria/baixos">Página: Baixos</option>
              <option value="/categoria/violoes">Página: Violões</option>
              <option value="/categoria/amps">Página: Amps</option>
              <option value="/categoria/pedais">Página: Pedais</option>
              <option value="/categoria/vintage">Página: Vintage Collection</option>
              <option value="/categoria/custom-shop">Página: Custom Shop</option>
            </optgroup>
            <optgroup label="Serviços">
               <option value="/servicos">Página: Serviços Gerais</option>
               <option value="/servicos/lutheria">Serviço: Lutheria</option>
               <option value="/servicos/custom-pickups">Serviço: Custom Pickups</option>
               <option value="/servicos/aulas">Serviço: Aulas</option>
            </optgroup>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Imagem da Categoria</label>
          <MediaUpload 
            value={imagemMedia} 
            onChange={setImagemMedia}
          />
        </div>
      </div>
    </form>
  );
}
