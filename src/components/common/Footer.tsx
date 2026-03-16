// src/components/common/Footer.tsx
import Link from 'next/link';
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna 1: Logo e Descrição */}
          <div className={styles.column}>
            <img src="/guitargarage.png" alt="Guitar Garage" className={styles.footerLogo} />
            <p className={styles.description}>
              Desde 2012, curando os melhores instrumentos vintage e de boutique para músicos exigentes.
            </p>
            <div className={styles.socials}>
              <Instagram size={20} />
              <Facebook size={20} />
              <Youtube size={20} />
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className={styles.column}>
            <h3>EXPLORAR</h3>
            <ul>
              <li><Link href="/estoque">Todo o Estoque</Link></li>
              <li><Link href="/novidades">Novidades</Link></li>
              <li><Link href="/servicos">Lutheria & Aulas</Link></li>
              <li><Link href="/sobre">Sobre a Garagem</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className={styles.column}>
            <h3>CONTATO</h3>
            <ul className={styles.contactList}>
              <li><MapPin size={16} /> Porto Alegre, RS - Brasil</li>
              <li><Phone size={16} /> +55 51 99189-8846</li>
              <li><Mail size={16} /> contato@guitargarage.com.br</li>
            </ul>
          </div>

          {/* Coluna 4: Badge/Horário */}
          <div className={styles.column}>
            <h3>VISITE-NOS</h3>
            <p className={styles.hours}>
              Segunda a Sexta: 10h às 18h<br/>
              Sábados: Sob Agendamento
            </p>
            <div className={styles.goldBadge}>AGENDAR VISITA</div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>© 2026 Guitar Garage. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
