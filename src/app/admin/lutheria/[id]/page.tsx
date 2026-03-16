// src/app/admin/lutheria/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import LutheriaForm from '../LutheriaForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarProjetoLutheria({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) notFound();

  const project = await prisma.projetoLutheria.findUnique({
    where: { id: projectId },
    include: { imagens: true }
  });

  if (!project) notFound();

  return (
    <div className={styles.container}>
      <LutheriaForm initialData={project} />
    </div>
  );
}
