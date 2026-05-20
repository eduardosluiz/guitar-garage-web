import React from 'react';
import { prisma } from '@/lib/prisma';
import DestaqueForm from '@/components/admin/DestaqueForm';
import { notFound } from 'next/navigation';
import styles from '../../../produtos/novo/page.module.css';

export default async function EditarDestaque({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destaqueId = parseInt(id);

  if (isNaN(destaqueId)) notFound();

  const destaque = await prisma.banner.findUnique({
    where: { id: destaqueId },
    include: { media: true }
  });

  if (!destaque) notFound();

  return (
    <div className={styles.container}>
      <DestaqueForm initialData={destaque} />
    </div>
  );
}
