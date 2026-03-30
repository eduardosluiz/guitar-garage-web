// src/components/common/HeaderClient.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, Phone, ChevronDown, X } from 'lucide-react';
import styles from './Header.module.css';

const MENU_ITEMS = [
  { 
    name: 'GUITARRAS', 
    href: '/categoria/guitarras',
    sub: [
      { name: 'Fender', href: '/categoria/guitarras/fender' },
      { name: 'Gibson', href: '/categoria/guitarras/gibson' },
      { name: 'Guitar Garage', href: '/categoria/guitarras/guitar-garage' },
      { name: 'Outras', href: '/categoria/guitarras/outras' }
    ]
  },
  { 
    name: 'BAIXOS', 
    href: '/categoria/baixos',
    sub: [
      { name: 'Fender', href: '/categoria/baixos/fender' },
      { name: 'Rickenbacker', href: '/categoria/baixos/rickenbacker' },
      { name: 'Music Man', href: '/categoria/baixos/music-man' }
    ]
  },
  { 
    name: 'AMPS', 
    href: '/categoria/amps',
    sub: [
      { name: 'Vox', href: '/categoria/amps/vox' },
      { name: 'Marshall', href: '/categoria/amps/marshall' },
      { name: 'Fender', href: '/categoria/amps/fender' },
      { name: 'Orange', href: '/categoria/amps/orange' }
    ]
  },
  { name: 'VIOLÕES', href: '/categoria/violoes' },
  { 
    name: 'SERVIÇOS', 
    href: '/servicos',
    sub: [
      { name: 'Lutheria', href: '/servicos/lutheria' },
      { name: 'GG Custom Pickups', href: '/servicos/custom-pickups' },
      { name: 'Aulas', href: '/servicos/aulas' }
    ]
  },
];

interface HeaderClientProps {
  whatsapp: string;
  telefone: string;
}

export default function HeaderClient({ whatsapp, telefone }: HeaderClientProps) {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Limpa o número de whatsapp para o link (mantém apenas dígitos e adiciona 55 se necessário)
  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp.startsWith('55') ? cleanWhatsapp : `55${cleanWhatsapp}`}`;

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <p>ATENDIMENTO: SEG A SEX - 10H ÀS 18H | WHATSAPP: {whatsapp}</p>
      </div>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/ggtransparente.png" alt="Guitar Garage" className={styles.logoImg} />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {MENU_ITEMS.map((item) => (
              <li 
                key={item.name} 
                className={styles.navItem}
                onMouseEnter={() => setActiveSub(item.name)}
                onMouseLeave={() => setActiveSub(null)}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.name} {item.sub && <ChevronDown size={12} />}
                </Link>
                
                <AnimatePresence>
                  {item.sub && activeSub === item.name && (
                    <motion.div 
                      key={`dropdown-${item.name}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={styles.dropdown}
                    >
                      {item.sub.map(subItem => (
                        <Link key={subItem.name} href={subItem.href} className={styles.dropdownItem}>
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            <span>ENTRE EM CONTATO</span>
          </a>
          <button className={styles.menuToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileMenuHeader}>
              <img src="/ggtransparente.png" alt="Logo" className={styles.mobileLogo} />
              <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <nav className={styles.mobileNav}>
              {MENU_ITEMS.map((item) => (
                <div key={`mobile-nav-${item.name}`} className={styles.mobileNavItem}>
                  <Link href={item.href} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                  {item.sub && (
                    <div className={styles.mobileSubList}>
                      {item.sub.map(sub => (
                        <Link key={`mobile-sub-${sub.name}`} href={sub.href} className={styles.mobileSubLink} onClick={() => setIsMenuOpen(false)}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
