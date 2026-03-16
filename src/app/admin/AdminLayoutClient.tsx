"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Layers, 
  Image as ImageIcon, 
  Settings, 
  LogOut,
  Hammer,
  MessageSquareQuote
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import styles from './layout.module.css';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin' },
    { icon: <Package size={20} />, label: 'Produtos', href: '/admin/produtos' },
    { icon: <Tag size={20} />, label: 'Marcas', href: '/admin/marcas' },
    { icon: <Layers size={20} />, label: 'Categorias', href: '/admin/categorias' },
    { icon: <Hammer size={20} />, label: 'Lutheria', href: '/admin/lutheria' },
    { icon: <MessageSquareQuote size={20} />, label: 'Depoimentos', href: '/admin/depoimentos' },
    { icon: <ImageIcon size={20} />, label: 'Banners', href: '/admin/banners' },
    { icon: <Settings size={20} />, label: 'Configurações', href: '/admin/configuracoes' },
  ];

  const getBreadcrumb = () => {
    if (pathname === '/admin') return { parent: 'Admin', current: 'Dashboard' };
    const menuItem = menuItems.find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)));
    if (!menuItem) return { parent: 'Admin', current: 'Dashboard' };
    let currentLabel = menuItem.label;
    if (pathname.includes('/novo')) currentLabel = `${menuItem.label} / Novo`;
    else if (pathname.match(/\/admin\/.+\/\d+/)) currentLabel = `${menuItem.label} / Editar`;
    return { parent: 'Admin', current: currentLabel };
  };

  const bc = getBreadcrumb();

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <img src="/ggtransparente.png" alt="Guitar Garage" className={styles.adminLogo} />
          </Link>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) ? styles.active : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.logoutSection}>
          <button 
            onClick={handleLogout} 
            className={styles.logoutBtn}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              width: '100%', 
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
              padding: '0.8rem 1.2rem'
            }}
          >
            <LogOut size={18} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <span className={styles.bcParent}>{bc.parent}</span>
            <span className={styles.bcSeparator}>/</span>
            <span className={styles.bcCurrent}>{bc.current}</span>
          </div>
          <div className={styles.userProfile}>
            <span>Administrador</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
