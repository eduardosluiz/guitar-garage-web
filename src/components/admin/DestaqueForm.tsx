// src/components/admin/DestaqueForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Info } from 'lucide-react';
import ImageUpload from './ImageUpload';
import styles from './ProductForm.module.css';

interface DestaqueFormProps {
  initialData?: any;
}

export default function DestaqueForm({ initialData }: DestaqueFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || '',
    imagemUrl: initialData?.imagemUrl || '',
    posicao: initialData?.posicao || 'lutheria',
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
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
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          id: initialData?.id,
          // Banners de destaque não precisam de subtitulo/cta por padrão do layout atual das páginas
          subtitulo: '',
          ctaTexto: '',
          ctaLink: '',
          ordem: 0
        }),
      });

      if (response.ok) {
        router.push('/admin/banners');
        router.refresh();
      } else {
        alert('Erro ao salvar imagem de destaque');
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
        <h2>{initialData ? 'Editar Destaque' : 'Novo Destaque de Página'}</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Destaque'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Local e Imagem</h3>
            <div className={styles.inputGroup}>
              <label>Página de Destino</label>
              <select name="posicao" value={formData.posicao} onChange={handleChange}>
                <option value="lutheria">Página Lutheria</option>
                <option value="pickups-1">Custom Pickups - Imagem 1 (Esquerda/Vertical)</option>
                <option value="pickups-2">Custom Pickups - Imagem 2 (Direita/Vertical)</option>
                <option value="aulas">Página Aulas</option>
              </select>
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Título de Referência (Opcional)</label>
              <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Ex: Foto Principal Lutheria" />
            </div>

            <div className={styles.inputGroup} style={{ marginTop: '2rem' }}>
              <label>Upload da Imagem</label>
              <ImageUpload 
                value={formData.imagemUrl ? [formData.imagemUrl] : []} 
                onChange={(url) => setFormData(prev => ({ ...prev, imagemUrl: url }))}
                onRemove={() => setFormData(prev => ({ ...prev, imagemUrl: '' }))}
              />
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3><Info size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Info</h3>
            <p style={{ fontSize: '0.8rem', color: '#878a99', lineHeight: '1.6' }}>
              As imagens de destaque das páginas de serviço geralmente possuem formatos específicos.
              <br /><br />
              <strong>Pickups:</strong> Use imagens verticais para melhor preenchimento do layout.
            </p>
            <div className={styles.checkboxGroup} style={{ marginTop: '2rem' }}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Destaque Ativo
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
