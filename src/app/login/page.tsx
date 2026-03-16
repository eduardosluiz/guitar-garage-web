// src/app/login/page.tsx
"use client";

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Home } from 'lucide-react';
import Link from 'next/link';
import styles from './login.module.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  
  const [error, setError] = useState(
    errorParam === 'CredentialsSignin' ? 'E-mail ou senha incorretos' : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('E-mail ou senha incorretos');
        } else {
          setError('Erro de configuração: ' + result.error);
        }
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('Ocorreu um erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Link href="/" className={styles.homeBtn} title="Voltar para o Site">
          <Home size={20} />
        </Link>
        <div className={styles.logoWrapper}>
          <img src="/ggtransparente.png" alt="Guitar Garage" className={styles.logo} />
        </div>
        
        <div className={styles.header}>
          <h1>Acesso Restrito</h1>
          <p>Área administrativa da Guitar Garage.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="exemplo@guitargarage.com.br"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button type="submit" disabled={loading} className="btn-boutique">
            {loading ? 'AUTENTICANDO...' : 'ENTRAR NO PAINEL'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#1a1d21', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
