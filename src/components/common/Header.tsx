// src/components/common/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, Phone, ChevronDown } from 'lucide-react';
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

export default function Header() {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const WHATSAPP_URL = "https://wa.me/5551991898846";

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <p>RESERVAS E ATENDIMENTO PERSONALIZADO VIA WHATSAPP</p>
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
                
                {item.sub && activeSub === item.name && (
                  <div className={styles.dropdown}>
                    {item.sub.map(subItem => (
                      <Link key={subItem.name} href={subItem.href} className={styles.dropdownItem}>
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            <span>FALAR COM ESPECIALISTA</span>
          </a>
          <button className={styles.menuToggle}><Menu size={24} /></button>
        </div>
      </div>
    </header>
  );
}
