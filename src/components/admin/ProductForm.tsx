// src/components/admin/ProductForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, ArrowLeft } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  categories: any[];
  brands: any[];
  initialData?: any;
}

export default function ProductForm({ categories, brands, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    slug: initialData?.slug || '',
    preco: initialData?.preco || '',
    descricao: initialData?.descricao || '',
    peso: initialData?.peso || '',
    ano: initialData?.ano || '',
    condicao: initialData?.condicao || 'Novo',
    status: initialData?.status || 'Disponivel',
    isDestaque: initialData?.isDestaque || false,
    isNovidade: initialData?.isNovidade || true,
    marcaId: initialData?.marcaId || '',
    categoriaId: initialData?.categoriaId || '',
    especificacoes: initialData?.especificacoes || {},
  });

  const [images, setImages] = useState<MediaItem[]>(
    initialData?.imagens?.map((img: any) => ({ url: img.url, ordem: img.ordem || 0 })) || []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));

    if (name === 'nome' && !initialData) {
      const slug = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/produtos', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: initialData?.id, images }),
      });

      if (response.ok) {
        router.push('/admin/produtos');
        router.refresh();
      } else {
        alert('Erro ao salvar produto');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>{initialData ? 'Editar Produto' : 'Novo Produto'}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Informações Básicas</h3>
            <div className={styles.inputGroup}>
              <label>Nome do Produto</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Fender Stratocaster 1974" />
            </div>
            <div className={styles.inputGroup}>
              <label>Slug (URL)</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} required placeholder="ex-fender-stratocaster-1974" />
            </div>
            <div className={styles.inputGroup}>
              <label>Descrição</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={6} placeholder="Descreva o instrumento em detalhes..." />
            </div>
          </div>

          <div className={styles.card}>
            <h3>Galeria de Imagens</h3>
            <p style={{ fontSize: '0.75rem', color: '#878a99', marginBottom: '1.5rem' }}>
              A primeira imagem será a **Capa** do produto. Use as setas para organizar a ordem.
            </p>
            <MediaUpload 
              value={images} 
              onChange={(items) => setImages(items)}
            />
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3>Preço e Status</h3>
            <div className={styles.inputGroup}>
              <label>Preço (R$)</label>
              <input type="number" name="preco" value={formData.preco} onChange={handleChange} step="0.01" placeholder="0.00" />
            </div>
            <div className={styles.inputGroup}>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Disponivel">Disponível</option>
                <option value="Vendido">Vendido</option>
                <option value="Reservado">Reservado</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="isDestaque" checked={formData.isDestaque} onChange={handleChange} />
                Destaque na Home
              </label>
            </div>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="isNovidade" checked={formData.isNovidade} onChange={handleChange} />
                Marcar como Novidade
              </label>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Atributos</h3>
            <div className={styles.inputGroup}>
              <label>Categoria</label>
              <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                <option value="">Selecionar Categoria</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            {categories.find(c => String(c.id) === String(formData.categoriaId))?.slug === 'guitarras' && (
              <div className={styles.inputGroup}>
                <label>Marca</label>
                <select name="marcaId" value={formData.marcaId} onChange={handleChange} required>
                  <option value="">Selecionar Marca</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
                </select>
              </div>
            )}
            <div className={styles.inputGroup}>
              <label>Condição</label>
              <select name="condicao" value={formData.condicao} onChange={handleChange}>
                <option value="Novo">Novo</option>
                <option value="Semi-novo">Semi-novo</option>
                <option value="Vintage">Vintage</option>
                <option value="Relic">Relic</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Ano</label>
              <input type="number" name="ano" value={formData.ano} onChange={handleChange} placeholder="Ex: 1974" />
            </div>
            <div className={styles.inputGroup}>
              <label>Peso</label>
              <input type="text" name="peso" value={formData.peso} onChange={handleChange} placeholder="Ex: 3.5kg" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
