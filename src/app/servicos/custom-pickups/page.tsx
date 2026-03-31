// src/app/servicos/custom-pickups/page.tsx
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CustomPickupsClient from './CustomPickupsClient';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default function CustomPickups() {
  return (
    <main className={styles.main}>
      <Header />
      <CustomPickupsClient />
      <Footer />
    </main>
  );
}
