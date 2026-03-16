// src/app/admin/produtos/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';
import styles from '../novo/page.module.css';

export default async function EditarProduto({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id);

  if (isNaN(productId)) notFound();

  const product = await prisma.produto.findUnique({
    where: { id: productId },
    include: { imagens: true }
  });

  if (!product) notFound();

  const categories = await prisma.categoria.findMany({ orderBy: { nome: 'asc' } });
  const brands = await prisma.marca.findMany({ orderBy: { nome: 'asc' } });

  return (
    <div className={styles.container}>
      <ProductForm 
        categories={categories} 
        brands={brands} 
        initialData={product} 
      />
    </div>
  );
}
