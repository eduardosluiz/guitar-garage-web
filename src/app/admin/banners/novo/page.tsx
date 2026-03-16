// src/app/admin/banners/novo/page.tsx
import React from 'react';
import BannerForm from '@/components/admin/BannerForm';
import styles from '../../produtos/novo/page.module.css';

export default function NovoBanner() {
  return (
    <div className={styles.container}>
      <BannerForm />
    </div>
  );
}
