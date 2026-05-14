// src/app/admin/tones/novo/page.tsx
import React from 'react';
import TonesForm from '@/components/admin/TonesForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovoTone() {
  return (
    <div className={styles.container}>
      <TonesForm />
    </div>
  );
}
