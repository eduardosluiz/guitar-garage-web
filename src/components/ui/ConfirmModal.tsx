// src/components/ui/ConfirmModal.tsx
"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar Exclusão",
  message = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  loading = false
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper}>
          <AlertTriangle size={48} />
        </div>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.btnCancel} onClick={onClose} disabled={loading}>
            CANCELAR
          </button>
          <button className={styles.btnConfirm} onClick={onConfirm} disabled={loading}>
            {loading ? "EXCLUINDO..." : "SIM, EXCLUIR"}
          </button>
        </div>
      </div>
    </div>
  );
}
