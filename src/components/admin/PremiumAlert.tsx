"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Plus, Edit2 } from 'lucide-react';

interface PremiumAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'warning' | 'error';
  confirmText?: string;
  cancelText?: string;
}

export default function PremiumAlert({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  type = 'warning',
  confirmText = 'EDITAR EXISTENTE',
  cancelText = 'CRIAR NOVO'
}: PremiumAlertProps) {
  if (!isOpen) return null;

  const isError = type === 'error';

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{
            backgroundColor: '#1a1d21',
            border: `1px solid ${isError ? 'rgba(220, 38, 38, 0.4)' : 'rgba(212, 175, 55, 0.3)'}`,
            borderRadius: '4px',
            width: '100%',
            maxWidth: '500px',
            padding: '2.5rem',
            position: 'relative',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#878a99',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: isError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(212, 175, 55, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: isError ? '#ef4444' : '#D4AF37'
          }}>
            <AlertCircle size={32} />
          </div>

          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1rem',
            letterSpacing: '0.5px'
          }}>
            {title}
          </h3>

          <p style={{
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#878a99',
            marginBottom: '2rem'
          }}>
            {message}
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {!isError && (
              <button
                onClick={onClose}
                className="btn-boutique-outline"
                style={{
                  flex: 1,
                  padding: '0 1rem',
                  fontSize: '0.7rem',
                  letterSpacing: '1px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Plus size={14} /> {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className="btn-boutique"
              style={{
                flex: 1,
                padding: '0 1rem',
                fontSize: '0.7rem',
                letterSpacing: '1px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: isError ? '#dc2626' : undefined,
                borderColor: isError ? '#dc2626' : undefined
              }}
            >
              {isError ? <AlertCircle size={14} /> : <Edit2 size={14} />} {confirmText}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
