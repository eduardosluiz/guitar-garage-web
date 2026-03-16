// src/app/admin/depoimentos/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusCircle, Edit2, MessageSquareQuote, Eye, EyeOff } from 'lucide-react';
import DeleteButtonGeneral from '@/components/admin/DeleteButtonGeneral';
import styles from '../produtos/page.module.css';

export default async function AdminDepoimentos() {
  const data = await prisma.depoimento.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <MessageSquareQuote size={18} />
          <input type="text" placeholder="Buscar depoimento..." />
        </div>
        <Link href="/admin/depoimentos/novo" className="btn-boutique">
          <PlusCircle size={16} /> NOVO DEPOIMENTO
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Mensagem</th>
              <th>Data / Hora</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((d) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{d.nome}</td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.texto}
                  </td>
                  <td>
                    {new Date(d.createdAt).toLocaleDateString('pt-BR')} às {new Date(d.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    {d.isAtivo ? (
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
                    <Link href={`/admin/depoimentos/${d.id}`} title="Editar" className={styles.actionBtn}>
                      <Edit2 size={16} />
                    </Link>
                    <DeleteButtonGeneral id={d.id} resource="depoimentos" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#878a99' }}>
                  Nenhum depoimento cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
