// src/app/admin/lutheria/novo/page.tsx
import React from 'react';
import LutheriaForm from '../LutheriaForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovoProjetoLutheria() {
  return (
    <div className={styles.container}>
      <LutheriaForm />
    </div>
  );
}
