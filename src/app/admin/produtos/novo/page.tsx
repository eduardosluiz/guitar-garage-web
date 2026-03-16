// src/app/admin/produtos/novo/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import styles from './page.module.css';

export default async function NovoProduto() {
  const categories = await prisma.categoria.findMany({ orderBy: { nome: 'asc' } });
  const brands = await prisma.marca.findMany({ orderBy: { nome: 'asc' } });

  return (
    <div className={styles.container}>
      <ProductForm categories={categories} brands={brands} />
    </div>
  );
}
