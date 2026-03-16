// src/components/admin/DeleteButtonGeneral.tsx
"use client";

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/produtos/page.module.css';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface DeleteButtonProps {
  id: number;
  resource: string; 
}

export default function DeleteButtonGeneral({ id, resource }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${resource}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsModalOpen(false);
        router.refresh();
      } else {
        alert('Erro ao excluir item. Verifique se existem dependências.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        disabled={loading}
        className={`${styles.actionBtn} ${styles.deleteBtn}`}
        title="Excluir"
      >
        <Trash2 size={16} />
      </button>

      <ConfirmModal 
        isOpen={isModalOpen}
        loading={loading}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
