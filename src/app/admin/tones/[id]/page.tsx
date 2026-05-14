// src/app/admin/tones/[id]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import TonesForm from '@/components/admin/TonesForm';
import { notFound } from 'next/navigation';
import styles from '../../produtos/novo/page.module.css';

export default async function EditarTone({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const toneId = parseInt(id);

  if (isNaN(toneId)) notFound();

  const tone = await prisma.banner.findUnique({
    where: { id: toneId },
    include: { media: true }
  });

  if (!tone) notFound();

  // Verificar se o item pertence realmente a Tones
  const isTone = [
    'custom-pickups', 
    'card-two-tone', 'card-three-tone', 'card-buttertone',
    'two-tone', 'three-tone', 'buttertone'
  ].includes(tone.posicao);

  if (!isTone) notFound();

  return (
    <div className={styles.container}>
      <TonesForm initialData={tone} />
    </div>
  );
}
