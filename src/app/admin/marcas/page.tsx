// src/app/admin/marcas/page.tsx
import React, { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusCircle, Edit2, ShieldCheck, Search } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import SearchInput from '@/components/admin/SearchInput';
import styles from '../produtos/page.module.css';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminMarcas({ searchParams }: PageProps) {
  const { q } = await searchParams;

  const brands = await prisma.marca.findMany({
    where: q ? { nome: { contains: q } } : {},
    include: { _count: { select: { produtos: true } } },
    orderBy: { nome: 'asc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Suspense fallback={<div className={styles.searchBox}><Search size={18} /><input type="text" placeholder="Buscar marca..." disabled /></div>}>
          <SearchInput placeholder="Buscar marca..." />
        </Suspense>
        <Link href="/admin/marcas/novo" className="btn-boutique">
          <PlusCircle size={16} /> NOVA MARCA
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nome</th>
              <th>Slug</th>
              <th>Qtd. Produtos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div className={styles.thumbnail}>
                      {b.logo_url ? (
                        <img src={b.logo_url} alt={b.nome} />
                      ) : (
                        <ImageIcon size={20} style={{ opacity: 0.2 }} />
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{b.nome}</td>
                  <td>{b.slug}</td>
                  <td>{b._count.produtos}</td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/marcas/${b.id}`} title="Editar" className={styles.actionBtn}>
                      <Edit2 size={16} />
                    </Link>
                    <DeleteButtonGeneral id={b.id} resource="marcas" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#878a99' }}>
                  Nenhuma marca cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
