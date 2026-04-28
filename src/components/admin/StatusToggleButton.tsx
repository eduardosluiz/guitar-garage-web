"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/produtos/page.module.css';

interface StatusToggleProps {
  id: number;
  initialStatus: boolean;
  resource: string;
}

export default function StatusToggleButton({ id, initialStatus, resource }: StatusToggleProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${resource}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          isAtivo: !initialStatus 
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Erro ao atualizar status.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle} 
      disabled={loading}
      className={styles.actionBtn}
      title={initialStatus ? "Ocultar" : "Publicar"}
      style={{ 
        color: initialStatus ? '#0ab39c' : '#f06548',
        opacity: loading ? 0.5 : 1
      }}
    >
      {initialStatus ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  );
}
