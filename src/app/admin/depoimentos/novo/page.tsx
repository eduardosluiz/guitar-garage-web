// src/app/admin/depoimentos/novo/page.tsx
import React from 'react';
import DepoimentoForm from '@/components/admin/DepoimentoForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovoDepoimento() {
  return (
    <div className={styles.container}>
      <DepoimentoForm />
    </div>
  );
}
