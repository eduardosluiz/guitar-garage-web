// src/app/admin/categorias/novo/page.tsx
import React from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovaCategoria() {
  return (
    <div className={styles.container}>
      <CategoryForm />
    </div>
  );
}
