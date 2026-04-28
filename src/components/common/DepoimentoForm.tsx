"use client";

import React, { useState } from 'react';
import styles from '../../app/sobre/page.module.css';

export default function DepoimentoForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [texto, setTexto] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot check
    if (honeypot !== '' || captchaAnswer !== '12') {
      alert('Verificação de segurança falhou. Por favor, resolva o cálculo corretamente.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/depoimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, texto }),
      });

      if (!response.ok) throw new Error('Falha ao enviar');

      setStatus('success');
      setNome('');
      setEmail('');
      setTexto('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '3rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', textAlign: 'center', marginTop: '2rem' }}>
        <h3 style={{ color: '#166534', marginBottom: '1rem' }}>Depoimento enviado com sucesso!</h3>
        <p style={{ color: '#166534' }}>Obrigado por compartilhar sua experiência. Ele passará por uma breve moderação antes de aparecer no site.</p>
        <button 
          onClick={() => setStatus('idle')}
          style={{ marginTop: '1.5rem', padding: '0.8rem 1.5rem', backgroundColor: '#166534', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Enviar outro depoimento
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '4rem', padding: '3rem', backgroundColor: '#fafafa', border: '1px solid #eee', borderRadius: '12px' }}>
      <h3 style={{ 
        fontFamily: 'Space Grotesk, sans-serif', 
        fontSize: '1.5rem', 
        fontWeight: 700, 
        marginBottom: '2rem', 
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        DEIXE SEU <span>DEPOIMENTO</span>
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nome Completo *</label>
            <input 
              type="text" 
              required 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Como quer ser identificado?"
              style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Seu E-mail (Opcional)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}
            />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Seu Depoimento *</label>
          <textarea 
            required 
            rows={5}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Conte-nos sobre sua experiência com a Guitar Garage..."
            style={{ width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff', resize: 'vertical' }}
          ></textarea>
        </div>

        {/* Segurança Anti-Bot */}
        <div style={{ display: 'none' }}>
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>

        <div style={{ backgroundColor: '#f3f4f6', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '0.75rem' }}>
            VERIFICAÇÃO HUMANA: Quanto é 8 + 4? *
          </label>
          <input 
            type="text" 
            required 
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Resultado"
            style={{ width: '120px', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '1rem' }}
          />
        </div>

        {status === 'error' && (
          <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>Ocorreu um erro ao enviar. Por favor, tente novamente.</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading'}
          style={{ 
            backgroundColor: '#111', 
            color: '#fff', 
            padding: '1.2rem 2rem', 
            border: 'none', 
            borderRadius: '4px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {status === 'loading' ? 'ENVIANDO...' : 'PUBLICAR DEPOIMENTO'}
        </button>
      </form>
    </div>
  );
}
