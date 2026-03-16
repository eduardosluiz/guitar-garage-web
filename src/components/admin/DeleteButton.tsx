// src/components/admin/DeleteButton.tsx
"use client";

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/produtos/page.module.css';
import ConfirmModal from '@/components/ui/ConfirmModal';

interface DeleteButtonProps {
  id: number;
  onDelete?: () => void;
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/produtos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsModalOpen(false);
        if (onDelete) onDelete();
        router.refresh();
      } else {
        alert('Erro ao excluir produto');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir produto');
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
