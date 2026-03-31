// src/app/estoque/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import EstoqueClient from './EstoqueClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function Estoque() {
  return (
    <main className={styles.main}>
      <Header />
      <EstoqueClient />
      <Footer />
    </main>
  );
}
