// src/components/common/HeaderClient.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, X, Instagram, MessageCircle } from 'lucide-react';
import styles from './Header.module.css';

const BrandIcons = {
  WhatsApp: ({ size = 22 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  )
};

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
  { name: 'BAIXOS', href: '/categoria/baixos' },
  { name: 'AMPS', href: '/categoria/amps' },
  { name: 'VIOLÕES', href: '/categoria/violoes' },
  { name: 'SERVIÇOS', href: '/servicos' },
  { name: 'DEPOIMENTOS', href: '/depoimentos' }
];

interface HeaderClientProps {
  whatsapp: string;
  telefone: string;
  socials?: {
    instagram: string | null;
    facebook: string | null;
    youtube: string | null;
    spotify: string | null;
    whatsapp: string | null;
  };
  visibility?: {
    instagram: boolean;
    facebook: boolean;
    youtube: boolean;
    spotify: boolean;
    whatsapp: boolean;
  };
}

export default function HeaderClient({ whatsapp, telefone, socials, visibility }: HeaderClientProps) {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cleanWhatsapp = whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp.startsWith('55') ? cleanWhatsapp : `55${cleanWhatsapp}`}?text=Olá, vim pelo site e gostaria de mais informações sobre a loja`;

  if (!isMounted) return <header className={styles.header} style={{ height: '140px' }}></header>;

  return (
    <header className={styles.header} suppressHydrationWarning>
      <div className={styles.topBar}>
        <p>ATENDIMENTO: SEG A SEX - 14H ÀS 20H <span className={styles.topBarDivider}>|</span> <span className={styles.whatsappBreak}>WHATSAPP: {whatsapp}</span></p>
      </div>
      <div className={styles.container}>
        <button className={styles.menuToggle} onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>

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
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            {visibility?.instagram && socials?.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ color: '#E4405F' }}>
                <Instagram size={22} />
              </a>
            )}
            
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappActionIcon} title="WhatsApp">
              <MessageCircle size={22} />
            </a>
          </div>

          {/* 
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            <span>ENTRE EM CONTATO</span>
          </a> 
          */}
        </div>
      </div>

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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href={item.href} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
                      {item.name}
                    </Link>
                    {item.sub && (
                      <button 
                        onClick={() => setMobileExpanded(mobileExpanded === item.name ? null : item.name)}
                        style={{ background: 'none', border: 'none', color: '#fff', padding: '10px' }}
                      >
                        <ChevronDown 
                          size={20} 
                          style={{ 
                            transform: mobileExpanded === item.name ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }} 
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.sub && mobileExpanded === item.name && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.mobileSubList}
                      >
                        {item.sub.map(sub => (
                          <Link key={`mobile-sub-${sub.name}`} href={sub.href} className={styles.mobileSubLink} onClick={() => setIsMenuOpen(false)}>
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
