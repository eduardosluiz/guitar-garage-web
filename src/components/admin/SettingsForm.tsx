// src/components/admin/SettingsForm.tsx
"use client";

import React, { useState } from 'react';
import { Save, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import styles from './SettingsForm.module.css';

interface SettingsFormProps {
  initialData?: any;
}

// Ícones Oficiais em SVG
const Icons = {
  WhatsApp: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.131.57-.074 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.405.015 12.042c0 2.123.553 4.197 1.602 6.04L0 24l6.149-1.613a11.715 11.715 0 005.9 1.594h.005c6.634 0 12.032-5.403 12.035-12.042a11.762 11.762 0 00-3.489-8.492z" fill="#25D366"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="#E4405F"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
    </svg>
  )
};

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp: initialData?.whatsapp || '',
    emailContato: initialData?.emailContato || '',
    instagramUrl: initialData?.instagramUrl || '',
    showInstagram: initialData?.showInstagram !== undefined ? initialData.showInstagram : true,
    facebookUrl: initialData?.facebookUrl || '',
    showFacebook: initialData?.showFacebook !== undefined ? initialData.showFacebook : true,
    youtubeUrl: initialData?.youtubeUrl || '',
    showYoutube: initialData?.showYoutube !== undefined ? initialData.showYoutube : true,
    telefone: initialData?.telefone || '',
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
      const response = await fetch('/api/admin/configuracoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Configurações salvas com sucesso');
      } else {
        alert('Erro ao salvar configurações');
      }
    } catch (error) {
      alert('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.settingsForm}>
      <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button type="submit" disabled={loading} className="btn-boutique">
          <Save size={16} /> {loading ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
        </button>
      </header>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Canais de Atendimento</h3>
        </div>
        <div className={styles.gridFields}>
          <div className={styles.inputWrapper}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.WhatsApp /> WHATSAPP BUSINESS
            </label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Ex: 5511999999999" />
          </div>
          <div className={styles.inputWrapper}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} color="#878a99" /> TELEFONE FIXO
            </label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(11) 3333-3333" />
          </div>
          <div className={styles.inputWrapper}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} color="#878a99" /> E-MAIL DE CONTATO
            </label>
            <input type="email" name="emailContato" value={formData.emailContato} onChange={handleChange} placeholder="contato@guitargarage.com.br" />
          </div>
        </div>
      </div>

      <div className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h3>Redes Sociais e Visibilidade</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Instagram Row */}
          <div className={styles.socialRow}>
            <div className={styles.inputWrapper} style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icons.Instagram /> INSTAGRAM URL
              </label>
              <input type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>
            <label className={`${styles.toggleBtn} ${formData.showInstagram ? styles.visible : styles.hidden}`} title={formData.showInstagram ? 'Visível no Site' : 'Oculto no Site'}>
              <input type="checkbox" name="showInstagram" checked={formData.showInstagram} onChange={handleChange} style={{ display: 'none' }} />
              {formData.showInstagram ? <Eye size={18} /> : <EyeOff size={18} />}
            </label>
          </div>

          {/* Facebook & YouTube Grid */}
          <div className={styles.gridFields}>
            <div className={styles.socialRow}>
              <div className={styles.inputWrapper} style={{ flex: 1 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icons.Facebook /> FACEBOOK URL
                </label>
                <input type="text" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://facebook.com/..." />
              </div>
              <label className={`${styles.toggleBtn} ${formData.showFacebook ? styles.visible : styles.hidden}`}>
                <input type="checkbox" name="showFacebook" checked={formData.showFacebook} onChange={handleChange} style={{ display: 'none' }} />
                {formData.showFacebook ? <Eye size={18} /> : <EyeOff size={18} />}
              </label>
            </div>

            <div className={styles.socialRow}>
              <div className={styles.inputWrapper} style={{ flex: 1 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icons.YouTube /> YOUTUBE URL
                </label>
                <input type="text" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/..." />
              </div>
              <label className={`${styles.toggleBtn} ${formData.showYoutube ? styles.visible : styles.hidden}`}>
                <input type="checkbox" name="showYoutube" checked={formData.showYoutube} onChange={handleChange} style={{ display: 'none' }} />
                {formData.showYoutube ? <Eye size={18} /> : <EyeOff size={18} />}
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
