// src/app/admin/categorias/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusCircle, Edit2, Layers } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import styles from '../produtos/page.module.css'; // Reusando CSS da tabela de produtos

export default async function AdminCategorias() {
  const categories = await prisma.categoria.findMany({
    include: { _count: { select: { produtos: true } } },
    orderBy: { nome: 'asc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <Layers size={18} />
          <input type="text" placeholder="Buscar categoria..." />
        </div>
        <Link href="/admin/categorias/novo" className="btn-boutique">
          <PlusCircle size={16} /> NOVA CATEGORIA
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Destino</th>
              <th>Qtd. Produtos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c: any) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{c.nome}</td>
                  <td style={{ fontSize: '0.75rem', color: '#878a99' }}>
                    {c.linkDestino || `/categoria/${c.slug}`}
                  </td>
                  <td>{c._count.produtos}</td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/categorias/${c.id}`} title="Editar" className={styles.actionBtn}>
                      <Edit2 size={16} />
                    </Link>
                    <DeleteButtonGeneral id={c.id} resource="categorias" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: '#878a99' }}>
                  Nenhuma categoria cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
