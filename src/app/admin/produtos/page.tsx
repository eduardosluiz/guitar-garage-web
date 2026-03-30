// src/app/admin/produtos/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PlusCircle, Search, Edit2, ExternalLink } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import styles from './page.module.css';

export default async function AdminProdutos() {
  const products = await prisma.produto.findMany({
    include: { marca: true, categoria: true, imagens: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input type="text" placeholder="Buscar instrumento..." />
        </div>
        <Link href="/admin/produtos/novo" className="btn-boutique">
          <PlusCircle size={16} /> 
          <span className="desktop-text">NOVO PRODUTO</span>
          <span className="mobile-text">NOVO</span>
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className={styles.thumbnail}>
                      {p.imagens[0] ? (
                        <img src={p.imagens[0].url} alt={p.nome} />
                      ) : (
                        <div className={styles.noImg}>-</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.productName}>
                      {p.nome}
                      {p.isDestaque && <span className={styles.badgeDestaque}>DESTAQUE</span>}
                    </div>
                  </td>
                  <td>{p.marca?.nome || '-'}</td>
                  <td>{p.categoria?.nome || '-'}</td>
                  <td style={{ color: 'var(--gold)', fontWeight: 600 }}>
                    {p.preco ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco) : '-'}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[p.status.toLowerCase()]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <Link href={`/admin/produtos/${p.id}`} title="Editar" className={styles.actionBtn}>
                      <Edit2 size={16} />
                    </Link>
                    <DeleteButton id={p.id} />
                    <Link href={`/produto/${p.slug}`} target="_blank" title="Ver no Site" className={styles.actionBtn}>
                      <ExternalLink size={16} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyMsg}>Nenhum produto cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
