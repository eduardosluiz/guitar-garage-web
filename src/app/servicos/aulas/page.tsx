// src/app/servicos/aulas/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AulasClient from './AulasClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function Aulas() {
  return (
    <main className={styles.main}>
      <Header />
      <AulasClient />
      <Footer />
    </main>
  );
}
