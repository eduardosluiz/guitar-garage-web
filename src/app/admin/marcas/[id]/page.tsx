// src/app/admin/marcas/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import BrandForm from '@/components/admin/BrandForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarMarca({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brandId = parseInt(id);

  if (isNaN(brandId)) notFound();

  const brand = await prisma.marca.findUnique({
    where: { id: brandId }
  });

  if (!brand) notFound();

  return (
    <div className={styles.container}>
      <BrandForm initialData={brand} />
    </div>
  );
}
