// src/components/common/FooterClient.tsx
"use client";

import Link from 'next/link';
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterClientProps {
  whatsapp: string;
  email: string;
  telefone: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  visibility: {
    instagram: boolean;
    facebook: boolean;
    youtube: boolean;
  };
}

export default function FooterClient({ whatsapp, email, telefone, socials, visibility }: FooterClientProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna 1: Logo e Descrição */}
          <div className={styles.column}>
            <img src="/guitargarage.png" alt="Guitar Garage" className={styles.footerLogo} />
            <p className={styles.description}>
              Desde 2002, curando os melhores instrumentos vintage e de boutique para músicos exigentes.
            </p>
            <div className={styles.socials}>
              {visibility.instagram && socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
              )}
              {visibility.facebook && socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} />
                </a>
              )}
              {visibility.youtube && socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={styles.column}>
            <h3>EXPLORAR</h3>
            <ul>
              <li><Link href="/estoque">Todo o Estoque</Link></li>
              <li><Link href="/novidades">Novidades</Link></li>
              <li><Link href="/servicos">Lutheria & Aulas</Link></li>
              <li><Link href="/sobre">Sobre a Garage</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className={styles.column}>
            <h3>CONTATO</h3>
            <ul className={styles.contactList}>
              <li><MapPin size={16} /> Porto Alegre, RS - Brasil</li>
              <li><Phone size={16} /> {whatsapp}</li>
              <li><Mail size={16} /> {email}</li>
            </ul>
          </div>

          {/* Coluna 4: Badge/Horário */}
          <div className={styles.column}>
            <h3>VISITE-NOS</h3>
            <p className={styles.hours}>
              Segunda a Sexta: 10h às 18h<br/>
              Sábados: Sob Agendamento
            </p>
            <div className={styles.goldBadge}>ENTRE EM CONTATO</div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2026 Guitar Garage. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
