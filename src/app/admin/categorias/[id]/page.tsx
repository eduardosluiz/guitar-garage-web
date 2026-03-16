// src/app/admin/categorias/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import CategoryForm from '@/components/admin/CategoryForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarCategoria({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) notFound();

  const category = await prisma.categoria.findUnique({
    where: { id: categoryId }
  });

  if (!category) notFound();

  return (
    <div className={styles.container}>
      <CategoryForm initialData={category} />
    </div>
  );
}
