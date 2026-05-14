// src/components/common/CookieConsent.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('guitar-garage-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 2000); // Aparece após 2 segundos
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('guitar-garage-cookie-consent', 'true');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: '90%',
            maxWidth: '500px',
            backgroundColor: '#111',
            border: '1px solid var(--gold)',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ 
              backgroundColor: 'rgba(212, 175, 55, 0.1)', 
              padding: '0.6rem', 
              borderRadius: '8px',
              color: 'var(--gold)'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ 
                color: '#fff', 
                margin: '0 0 0.4rem 0', 
                fontSize: '0.9rem', 
                fontFamily: 'Space Grotesk', 
                fontWeight: 700,
                letterSpacing: '1px'
              }}>COOKIES & PRIVACIDADE</h4>
              <p style={{ 
                color: '#888', 
                fontSize: '0.75rem', 
                lineHeight: '1.5',
                margin: 0
              }}>
                Utilizamos cookies para melhorar sua experiência em nossa boutique. Ao continuar navegando, você concorda com nossa política de privacidade.
              </p>
            </div>
            <button 
              onClick={() => setShowConsent(false)}
              style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={18} />
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button 
              onClick={acceptCookies}
              className="btn-boutique"
              style={{ 
                flex: 1, 
                fontSize: '0.7rem', 
                height: '40px',
                letterSpacing: '1px'
              }}
            >
              ACEITAR E CONTINUAR
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
