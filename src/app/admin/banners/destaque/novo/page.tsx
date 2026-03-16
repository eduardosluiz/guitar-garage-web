// src/app/admin/banners/destaque/novo/page.tsx
import React from 'react';
import DestaqueForm from '@/components/admin/DestaqueForm';
import styles from '../../../produtos/novo/page.module.css';

export default function NovoDestaque() {
  return (
    <div className={styles.container}>
      <DestaqueForm />
    </div>
  );
}
