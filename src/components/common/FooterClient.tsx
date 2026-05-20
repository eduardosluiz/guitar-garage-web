// src/components/common/FooterClient.tsx
"use client";

import Link from 'next/link';
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterClientProps {
  whatsapp: string;
  email: string;
  telefone: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    spotify: string;
    whatsapp: string;
  };
  visibility: {
    instagram: boolean;
    facebook: boolean;
    youtube: boolean;
    spotify: boolean;
    whatsapp: boolean;
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
              Desde 2002
            </p>
            <div className={styles.socials}>
              {visibility.instagram && socials.instagram && (
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={22} color="#E4405F" />
                </a>
              )}
              {visibility.facebook && socials.facebook && (
                <a href={socials.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={22} color="#1877F2" />
                </a>
              )}
              {visibility.youtube && socials.youtube && (
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube size={22} color="#FF0000" />
                </a>
              )}
              {visibility.spotify && socials.spotify && (
                <a href={socials.spotify} target="_blank" rel="noopener noreferrer">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.522 17.338c-.21.345-.662.455-1.008.245-2.76-1.685-6.233-2.062-10.334-1.13-.393.09-7.79-.158-8.88-.553-.344-.21-.454-.663-.244-1.008.21-.345.663-.454 1.008-.244 4.545-1.026 8.358-.592 11.458 1.303.346.21.456.663.245 1.008zm1.434-3.18c-.263.428-.824.568-1.252.304-3.155-1.942-7.986-2.523-11.66-1.408-.485.147-.996-.128-1.144-.613-.148-.485.128-.996.613-1.144 4.22-1.282 9.566-.632 13.136 1.562.427.263.568.824.305 1.252zm.126-3.328C15.226 8.528 8.847 8.31 5.152 9.432c-.57.173-1.168-.15-1.34-7.22-.173-.57.15-1.168.72-1.34 4.29-1.304 11.38-1.06 15.937 1.644.502.298.667.942.368 1.444-.298.502-.943.667-1.445.368z"/>
                  </svg>
                </a>
              )}
              {visibility.whatsapp && socials.whatsapp && (
                <a href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}?text=Olá, vim pelo site e gostaria de mais informações!`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={22} color="#25D366" />
                </a>
              )}
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={styles.column}>
            <h3>EXPLORAR</h3>
            <ul>
              <li><Link href="/depoimentos">Depoimentos</Link></li>
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
              <li><Phone size={16} /> (51) 3331.3234</li>
              <li><Mail size={16} /> {email}</li>
            </ul>
          </div>

          {/* Coluna 4: Badge/Horário */}
          <div className={styles.column}>
            <h3>VISITE-NOS</h3>
            <p className={styles.hours}>
              Segunda a Sexta: 14h às 20h<br/>
              Sábados: Sob Agendamento
            </p>
            <div className={styles.goldBadge}>ENTRE EM CONTATO</div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.bottomContent}>
          <p>© 2026 Guitar Garage. Todos os direitos reservados.</p>
          <Link href="/politica-de-privacidade" className={styles.privacyLink}>Políticas de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
