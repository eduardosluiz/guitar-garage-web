// src/app/admin/lutheria/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusCircle, Edit2, Hammer, Eye, EyeOff } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import styles from '../produtos/page.module.css';

export default async function AdminLutheria() {
  const projects = await prisma.projetoLutheria.findMany({
    include: { imagens: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <Hammer size={18} />
          <input type="text" placeholder="Buscar projeto..." />
        </div>
        <Link href="/admin/lutheria/novo" className="btn-boutique">
          <PlusCircle size={16} /> NOVO PROJETO
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Capa</th>
              <th>Título do Projeto</th>
              <th>Imagens</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.thumbnail}>
                      {p.imagens[0] ? (
                        <img src={p.imagens[0].url} alt={p.titulo} />
                      ) : (
                        <div className={styles.noImg}>-</div>
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{p.titulo}</td>
                  <td>{p.imagens.length} fotos</td>
                  <td>
                    {p.isAtivo ? (
                      <span style={{ color: '#0ab39c', fontSize: '0.7rem', fontWeight: 700 }}>
                        <Eye size={12} /> ATIVO
                      </span>
                    ) : (
                      <span style={{ color: '#f06548', fontSize: '0.7rem', fontWeight: 700 }}>
                        <EyeOff size={12} /> OCULTO
                      </span>
                    )}
                  </td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/lutheria/${p.id}`} title="Editar" className={styles.actionBtn}>
                      <Edit2 size={16} />
                    </Link>
                    <DeleteButtonGeneral id={p.id} resource="lutheria" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#878a99' }}>
                  Nenhum projeto de lutheria cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
