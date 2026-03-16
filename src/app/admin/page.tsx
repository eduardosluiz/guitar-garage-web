// src/app/admin/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Package, Tag, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';
import styles from './page.module.css';

export default async function AdminDashboard() {
  const productCount = await prisma.produto.count();
  const categoryCount = await prisma.categoria.count();
  const brandCount = await prisma.marca.count();
  const recentProducts = await prisma.produto.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { marca: true, categoria: true, imagens: true }
  });

  const stats = [
    { label: 'Total de Produtos', value: productCount, icon: <Package size={20} />, color: '#D4AF37' },
    { label: 'Categorias Ativas', value: categoryCount, icon: <Layers size={20} />, color: '#0ab39c' },
    { label: 'Marcas Parceiras', value: brandCount, icon: <Tag size={20} />, color: '#405189' },
    { label: 'Novos no Mês', value: 0, icon: <TrendingUp size={20} />, color: '#f06548' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <ArrowUpRight size={16} style={{ color: '#878a99', opacity: 0.5 }} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Produtos Adicionados Recentemente</h2>
          <Link href="/admin/produtos" className="btn-boutique-outline" style={{ fontSize: '0.65rem' }}>
            Ver Todos
          </Link>
        </div>
        
        <div className={styles.recentList}>
          {recentProducts.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Instrumento</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.tableThumbnail}>
                        {p.imagens[0] ? (
                          <img src={p.imagens[0].url} alt={p.nome} />
                        ) : (
                          <div className={styles.noImg}>-</div>
                        )}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{p.nome}</td>
                    <td>{p.marca?.nome || '-'}</td>
                    <td>{p.categoria?.nome || '-'}</td>
                    <td style={{ color: 'var(--gold)', fontWeight: 600 }}>
                      {p.preco ? `R$ ${p.preco.toLocaleString('pt-BR')}` : '-'}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[p.status.toLowerCase()]}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.emptyMsg}>Nenhum produto cadastrado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
