"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, PlusCircle, Trash2 } from 'lucide-react';
import MediaUpload, { MediaItem } from './MediaUpload';
import styles from './ProductForm.module.css';

interface SlideData {
  id: number;
  titulo: string;
  ctaTexto: string;
  ctaLink: string;
  ordem: number;
  imagemUrl: string;
}

export default function CarrosselForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [slides, setSlides] = useState<SlideData[]>([
    { id: Date.now(), titulo: '', ctaTexto: 'VER AGORA', ctaLink: '/estoque', ordem: 0, imagemUrl: '' }
  ]);

  const addSlide = () => {
    setSlides([...slides, { id: Date.now(), titulo: '', ctaTexto: 'VER AGORA', ctaLink: '/estoque', ordem: slides.length, imagemUrl: '' }]);
  };

  const removeSlide = (id: number) => {
    if (slides.length <= 1) {
      alert('O carrossel precisa ter ao menos uma imagem.');
      return;
    }
    setSlides(slides.filter(s => s.id !== id));
  };

  const handleChange = (id: number, field: keyof SlideData, val: string | number) => {
    setSlides(slides.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const handleMediaChange = (id: number, items: MediaItem[] | ((prev: MediaItem[]) => MediaItem[])) => {
    // Resolvemos functional updates
    let updatedItems: MediaItem[] = [];
    if (typeof items === 'function') {
      const slide = slides.find(s => s.id === id);
      const prevItems = slide?.imagemUrl ? [{ url: slide.imagemUrl, ordem: 0 }] : [];
      updatedItems = items(prevItems);
    } else {
      updatedItems = items;
    }
    const url = updatedItems.length > 0 ? updatedItems[updatedItems.length - 1].url : '';
    setSlides(slides.map(s => s.id === id ? { ...s, imagemUrl: url } : s));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slides.some(s => !s.imagemUrl)) {
      alert('Por favor, adicione uma imagem para todos os slides inseridos.');
      return;
    }
    
    setLoading(true);

    try {
      await Promise.all(slides.map(slide => 
        fetch('/api/admin/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            titulo: slide.titulo, 
            subtitulo: '', 
            ctaTexto: slide.ctaTexto, 
            ctaLink: slide.ctaLink, 
            imagemUrl: slide.imagemUrl, 
            posicao: 'home', 
            ordem: typeof slide.ordem === 'string' ? parseInt(slide.ordem) : slide.ordem, 
            isAtivo: true 
          }),
        })
      ));

      router.push('/admin/banners');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar as imagens do carrossel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.header}>
        <h2>Cadastrar Imagens do Carrossel (Home)</h2>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Carrossel'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {slides.map((slide, index) => (
          <div key={slide.id} className={styles.card} style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--gold)' }}>Slide/Imagem #{index + 1}</h3>
              <button 
                type="button" 
                onClick={() => removeSlide(slide.id)} 
                style={{ background: 'none', border: 'none', color: '#f06548', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                <Trash2 size={16} /> REMOVER SLIDE
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.inputGroup}>
                  <label>Título da Imagem (Exibido na Home)</label>
                  <input 
                    type="text" 
                    value={slide.titulo} 
                    onChange={(e) => handleChange(slide.id, 'titulo', e.target.value)} 
                    placeholder="Ex: NOVIDADES 2026" 
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Texto do Botão</label>
                  <input 
                    type="text" 
                    value={slide.ctaTexto} 
                    onChange={(e) => handleChange(slide.id, 'ctaTexto', e.target.value)} 
                    placeholder="Ex: VER AGORA" 
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Link do Botão (Destino)</label>
                  <select 
                    value={slide.ctaLink} 
                    onChange={(e) => handleChange(slide.id, 'ctaLink', e.target.value)}
                    required
                  >
                    <optgroup label="Páginas Gerais">
                      <option value="/estoque">Página: Todo o Estoque</option>
                      <option value="/novidades">Página: Novidades</option>
                      <option value="/sobre">Página: Sobre a Garage</option>
                    </optgroup>
                    <optgroup label="Categorias">
                      <option value="/categoria/guitarras">Categoria: Guitarras</option>
                      <option value="/categoria/baixos">Categoria: Baixos</option>
                      <option value="/categoria/amps">Categoria: Amps</option>
                      <option value="/categoria/violoes">Categoria: Violões</option>
                      <option value="/categoria/pedais">Categoria: Pedais</option>
                      <option value="/categoria/custom">Categoria: Custom Shop</option>
                      <option value="/categoria/vintage">Categoria: Vintage</option>
                    </optgroup>
                    <optgroup label="Serviços">
                      <option value="/servicos/lutheria">Serviço: Lutheria</option>
                      <option value="/servicos/custom-pickups">Serviço: Custom Pickups</option>
                      <option value="/servicos/aulas">Serviço: Aulas</option>
                    </optgroup>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Ordem de Exibição (0 = primeiro, 1 = segundo...)</label>
                  <input 
                    type="number" 
                    value={slide.ordem} 
                    onChange={(e) => handleChange(slide.id, 'ordem', parseInt(e.target.value) || 0)} 
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Upload da Imagem (High-Res) - Desktop/Mobile</label>
                <div style={{ marginTop: '0.5rem' }}>
                  <MediaUpload 
                    value={slide.imagemUrl ? [{ url: slide.imagemUrl, ordem: 0 }] : []} 
                    onChange={(items) => handleMediaChange(slide.id, items)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={addSlide} 
            className="btn-boutique-outline" 
            style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          >
            <PlusCircle size={18} /> ADICIONAR MAIS UMA IMAGEM
          </button>
        </div>
      </div>
    </form>
  );
}
