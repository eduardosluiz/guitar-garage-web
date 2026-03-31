// src/app/servicos/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ServicosClient from './ServicosClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function ServicosHub() {
  return (
    <main className={styles.main}>
      <Header />
      <ServicosClient />
      <Footer />
    </main>
  );
}
