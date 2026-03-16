// src/app/admin/marcas/novo/page.tsx
import React from 'react';
import BrandForm from '@/components/admin/BrandForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovaMarca() {
  return (
    <div className={styles.container}>
      <BrandForm />
    </div>
  );
}
