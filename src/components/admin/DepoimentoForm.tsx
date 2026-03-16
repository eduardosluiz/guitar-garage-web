// src/components/admin/DepoimentoForm.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, ArrowLeft } from 'lucide-react';
import styles from './ProductForm.module.css';

interface DepoimentoFormProps {
  initialData?: any;
}

export default function DepoimentoForm({ initialData }: DepoimentoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: initialData?.nome || '',
    email: initialData?.email || '',
    texto: initialData?.texto || '',
    isAtivo: initialData?.isAtivo !== undefined ? initialData.isAtivo : true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/depoimentos', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: initialData?.id }),
      });

      if (response.ok) {
        router.push('/admin/depoimentos');
        router.refresh();
      } else {
        alert('Erro ao salvar depoimento');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar depoimento');
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
          <h2>{initialData ? 'Editar Depoimento' : 'Novo Depoimento'}</h2>
        </div>
        <div className={styles.headerActions}>
          <button type="button" onClick={() => router.back()} className="btn-boutique-outline">
            <X size={16} /> Cancelar
          </button>
          <button type="submit" disabled={loading} className="btn-boutique">
            <Save size={16} /> {loading ? 'Salvando...' : 'Salvar Depoimento'}
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <h3>Dados do Cliente</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className={styles.inputGroup}>
                <label>Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: João da Silva" />
              </div>
              <div className={styles.inputGroup}>
                <label>E-mail (opcional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="joao@email.com" />
              </div>
            </div>
            <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
              <label>Mensagem / Depoimento</label>
              <textarea name="texto" value={formData.texto} onChange={handleChange} required rows={6} placeholder="O que o cliente disse sobre a Guitar Garage..." />
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <h3>Status</h3>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="isAtivo" checked={formData.isAtivo} onChange={handleChange} />
                Depoimento Visível no Site
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
