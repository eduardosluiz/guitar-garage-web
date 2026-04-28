"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Filter, ChevronDown, X } from 'lucide-react';
import styles from './page.module.css';

interface ClientPageProps {
  products: any[];
}

type SortOption = 'recentes' | 'preco-crescente' | 'preco-decrescente' | 'nome-az';

export default function ClientPage({ products }: ClientPageProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recentes');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [brandFilter, setBrandFilter] = useState<string>('todos');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extrair marcas únicas dos produtos para o filtro
  const availableBrands = useMemo(() => {
    const brands = products.map(p => p.marca?.nome).filter(Boolean);
    return Array.from(new Set(brands)).sort() as string[];
  }, [products]);

  // Lógica de filtragem e ordenação
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtragem por Status
    if (statusFilter !== 'todos') {
      result = result.filter(p => p.status === statusFilter);
    }

    // 2. Filtragem por Marca
    if (brandFilter !== 'todos') {
      result = result.filter(p => p.marca?.nome === brandFilter);
    }

    // 3. Ordenação
    result.sort((a, b) => {
      switch (sortBy) {
        case 'preco-crescente':
          return (a.preco || 0) - (b.preco || 0);
        case 'preco-decrescente':
          return (b.preco || 0) - (a.preco || 0);
        case 'nome-az':
          return a.nome.localeCompare(b.nome);
        case 'recentes':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [products, sortBy, statusFilter, brandFilter]);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Sob Consulta';
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(price);
  };

  const getSortLabel = (val: SortOption) => {
    switch (val) {
      case 'preco-crescente': return 'MENOR PREÇO';
      case 'preco-decrescente': return 'MAIOR PREÇO';
      case 'nome-az': return 'NOME A-Z';
      case 'recentes': default: return 'RECENTES';
    }
  };

  if (!isMounted) return <div className={styles.productSection}></div>;

  return (
    <>
      <section className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <button 
            className={`${styles.filterBtn} ${showFilters ? styles.filterBtnActive : ''}`} 
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <X size={16} /> : <Filter size={16} />} 
            {showFilters ? 'FECHAR' : 'FILTRAR'}
          </button>
          <span className={styles.count}>{filteredAndSortedProducts.length} INSTRUMENTOS ENCONTRADOS</span>
        </div>
        <div className={styles.filterRight}>
          <div className={styles.sortWrapper}>
            <span className={styles.sortLabel}>ORDENAR POR:</span>
            <select 
              className={styles.sortSelect} 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="recentes">RECENTES</option>
              <option value="preco-crescente">MENOR PREÇO</option>
              <option value="preco-decrescente">MAIOR PREÇO</option>
              <option value="nome-az">NOME A-Z</option>
            </select>
            <ChevronDown size={14} className={styles.sortIcon} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.filtersDrawer}
          >
            <div className={styles.filtersContainer}>
              <div className={styles.filterGroup}>
                <h4>DISPONIBILIDADE</h4>
                <div className={styles.filterOptions}>
                  <button 
                    className={statusFilter === 'todos' ? styles.optActive : ''} 
                    onClick={() => setStatusFilter('todos')}
                  >TODOS</button>
                  <button 
                    className={statusFilter === 'Disponivel' ? styles.optActive : ''} 
                    onClick={() => setStatusFilter('Disponivel')}
                  >DISPONÍVEL</button>
                  <button 
                    className={statusFilter === 'Vendido' ? styles.optActive : ''} 
                    onClick={() => setStatusFilter('Vendido')}
                  >VENDIDO</button>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4>MARCA</h4>
                <div className={styles.filterOptions}>
                  <button 
                    className={brandFilter === 'todos' ? styles.optActive : ''} 
                    onClick={() => setBrandFilter('todos')}
                  >TODAS</button>
                  {availableBrands.map(brand => (
                    <button 
                      key={brand}
                      className={brandFilter === brand ? styles.optActive : ''} 
                      onClick={() => setBrandFilter(brand)}
                    >{brand.toUpperCase()}</button>
                  ))}
                </div>
              </div>

              {(statusFilter !== 'todos' || brandFilter !== 'todos') && (
                <button 
                  className={styles.clearFilters}
                  onClick={() => { setStatusFilter('todos'); setBrandFilter('todos'); }}
                >LIMPAR FILTROS</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={styles.productSection}>
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map((p, index) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={styles.productCard}
              >
                <Link href={`/produto/${p.slug}`} className={styles.cardLink}>
                  <div className={styles.imageBox}>
                    <img src={p.imagens[0]?.url || 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800'} alt={p.nome} />
                    {p.status === 'Vendido' && <div className={styles.soldBadge}>VENDIDO</div>}
                    <div className={styles.overlay}><span>VER DETALHES</span></div>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.brand}>{p.marca?.nome}</span>
                    <h3>{p.nome}</h3>
                    <p className={styles.price}>{p.status === 'Vendido' ? 'Vendido' : formatPrice(p.preco)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredAndSortedProducts.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum instrumento encontrado com estes filtros.</p>
            <button onClick={() => { setStatusFilter('todos'); setBrandFilter('todos'); }}>LIMPAR FILTROS</button>
          </div>
        )}
      </section>
    </>
  );
}
