// src/app/admin/depoimentos/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import DepoimentoForm from '@/components/admin/DepoimentoForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarDepoimento({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const depoId = parseInt(id);

  if (isNaN(depoId)) notFound();

  const data = await prisma.depoimento.findUnique({
    where: { id: depoId }
  });

  if (!data) notFound();

  return (
    <div className={styles.container}>
      <DepoimentoForm initialData={data} />
    </div>
  );
}
