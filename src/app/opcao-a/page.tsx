// src/app/page.tsx
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  // URLs ULTRA-ESTÁVEIS (Testadas)
  const imgGtr = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgBass = "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=800";
  const imgAmp = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";
  const imgRare = "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800";
  const imgCustom = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";
  const imgPedais = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";
  const imgViol = "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=800";

  const guitars = [
    { id: 1, name: 'Gretsch 6120 Nashville', brand: 'Gretsch', status: 'NOVIDADE', price: 'R$ 24.900', img: imgGtr, slug: 'gretsch-6120' },
    { id: 2, name: 'Fender Stratocaster 1974', brand: 'Fender', status: 'VINTAGE', price: 'R$ 18.500', img: imgGtr, slug: 'fender-strat-74' },
    { id: 3, name: 'Gibson SG Standard', brand: 'Gibson', status: 'DESTAQUE', price: 'R$ 16.200', img: imgCustom, slug: 'gibson-sg' },
    { id: 4, name: 'PRS CE 24 Blue Matteo', brand: 'PRS', status: 'NOVIDADE', price: 'R$ 21.000', img: imgGtr, slug: 'prs-ce-24' },
  ];

  const basses = [
    { id: 5, name: 'Fender Precision 1978', brand: 'Fender', status: 'VINTAGE', price: 'R$ 15.900', img: imgBass, slug: 'fender-pbass-78' },
    { id: 6, name: 'Rickenbacker 4003', brand: 'Rickenbacker', status: 'NOVIDADE', price: 'R$ 22.500', img: imgBass, slug: 'rick-4003' },
    { id: 7, name: 'Music Man StingRay', brand: 'Music Man', status: 'HOT', price: 'R$ 14.200', img: imgBass, slug: 'stingray' },
    { id: 8, name: 'Gibson Thunderbird', brand: 'Gibson', status: 'VINTAGE', price: 'R$ 19.800', img: imgBass, slug: 'gibson-tbird' },
  ];

  const amps = [
    { id: 9, name: 'Vox AC30 1964 JMI', brand: 'Vox', status: 'RARIDADE', price: 'R$ 28.000', img: imgAmp, slug: 'vox-ac30-64' },
    { id: 10, name: 'Marshall JTM45 Offset', brand: 'Marshall', status: 'EM DESTAQUE', price: 'R$ 32.500', img: "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?q=80&w=800", slug: 'marshall-jtm45' },
    { id: 11, name: 'Fender Twin Reverb', brand: 'Fender', status: 'VINTAGE', price: 'R$ 12.200', img: imgAmp, slug: 'fender-twin' },
    { id: 12, name: 'Orange AD30 Combo', brand: 'Orange', status: 'NOVIDADE', price: 'R$ 9.800', img: imgAmp, slug: 'orange-ad30' },
  ];

  const categories = [
    { name: 'GUITARRAS', img: imgGtr },
    { name: 'BAIXOS', img: imgBass },
    { name: 'AMPS', img: imgAmp },
    { name: 'PEDAIS', img: imgPedais },
    { name: 'VIOLÕES', img: imgViol },
    { name: 'CUSTOM', img: imgCustom },
  ];

  return (
    <main className={styles.main}>
      <Header />

      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>CURADORIA DESDE 2012</div>
          <h1 className={styles.heroTitle}>A Arte de Tocar e <br /><span>o Prazer de Colecionar.</span></h1>
          <p className={styles.heroSubtitle}>Boutique especializada em instrumentos de investimento <span>PREMIUM</span> e de raridades vintage.</p>
          <div className={styles.heroActions}>
            <button className={styles.heroBtn}>ESTOQUE COMPLETO</button>
            <button className={`${styles.heroBtn} ${styles.btnGhost}`}>NOSSOS SERVIÇOS</button>
          </div>
          <div className={styles.carouselContainer}>
            <button className={styles.arrowBtn}><ChevronLeft size={28} /></button>
            <div className={styles.dots}><span className={`${styles.dot} ${styles.active}`}></span><span className={styles.dot}></span><span className={styles.dot}></span></div>
            <button className={styles.arrowBtn}><ChevronRight size={28} /></button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIAS */}
      <section className={styles.catExplorer}>
        <div className={styles.sectionHeader}>
          <span className={styles.preTitle}>NAVEGUE POR ESTILO</span>
          <h2 className={styles.playfairTitle}>Categorias</h2>
          <div className={styles.goldLine}></div>
        </div>
        <div className={styles.catGrid}>
          {categories.map((cat) => (
            <Link key={cat.name} href="#" className={styles.catCircleCard}>
              <div className={styles.circleImg}>
                <img src={cat.img} alt={cat.name} />
              </div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. COFRE */}
      <section className={styles.collection}>
        <div className={styles.sectionHeader}>
          <span className={styles.preTitle}>COLEÇÃO EXCLUSIVA</span>
          <h2 className={styles.playfairTitle}>O Cofre da Garagem</h2>
          <div className={styles.goldLine}></div>
        </div>
        <div className={styles.collectionGrid}>
          <div className={styles.catBig}>
            <div className={styles.mask}><img src={imgRare} alt="Rare" /></div>
            <div className={styles.catText}>
              <h3>RARIDADES VINTAGE</h3>
              <p>Instrumentos com história e valor de investimento.</p>
              <button className={styles.exploreBtn}>EXPLORAR COFRE <ArrowRight size={16} /></button>
            </div>
          </div>
          <div className={styles.gridRight}>
            <div className={styles.catSmall}>
              <div className={styles.mask}><img src={imgCustom} alt="Custom" /></div>
              <div className={styles.catText}><h3>CUSTOM SHOP</h3></div>
            </div>
            <div className={styles.catSmall}>
              <div className={styles.mask}><img src={imgAmp} alt="Amps" /></div>
              <div className={styles.catText}><h3>EQUIPAMENTO RARO</h3></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GUITARRAS */}
      <section className={styles.featured}>
        <div className={styles.sectionHeaderFlex}>
          <div className={styles.headerTitle}>
            <span className={styles.preTitle}>AS SEIS CORDAS</span>
            <h2 className={styles.playfairTitle}>Guitarras em Destaque</h2>
          </div>
          <Link href="/categoria/guitarras" className={styles.categoryLink}>
            VER COLEÇÃO COMPLETA <ArrowRight size={14} />
          </Link>
        </div>
        <div className={styles.goldLineLeft}></div>
        <div className={styles.productGrid}>
          {guitars.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 5. BAIXOS */}
      <section className={styles.featured}>
        <div className={styles.sectionHeaderFlex}>
          <div className={styles.headerTitle}>
            <span className={styles.preTitle}>GRAVES PROFUNDOS</span>
            <h2 className={styles.playfairTitle}>Baixos de Coleção</h2>
          </div>
          <Link href="/categoria/baixos" className={styles.categoryLink}>
            VER TODOS OS BAIXOS <ArrowRight size={14} />
          </Link>
        </div>
        <div className={styles.goldLineLeft}></div>
        <div className={styles.productGrid}>
          {basses.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 6. AMPS */}
      <section className={styles.featured}>
        <div className={styles.sectionHeaderFlex}>
          <div className={styles.headerTitle}>
            <span className={styles.preTitle}>POTÊNCIA VINTAGE</span>
            <h2 className={styles.playfairTitle}>Amplificadores & Raridades</h2>
          </div>
          <Link href="/categoria/amps" className={styles.categoryLink}>
            VER AMPLIFICADORES <ArrowRight size={14} />
          </Link>
        </div>
        <div className={styles.goldLineLeft}></div>
        <div className={styles.productGrid}>
          {amps.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* 7. AGENDAMENTO */}
      <section className={styles.booking}>
        <div className={styles.bookingInner}>
          <h2 className={styles.bookingTitle}>ATENDIMENTO INDIVIDUAL.</h2>
          <p>Agende uma visita e teste nosso estoque em um ambiente exclusivo para músicos e colecionadores.</p>
          <button className={styles.bookingBtn}>AGENDAR VISITA AGORA</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ p }: any) {
  return (
    <div className={styles.productCardMinimal}>
      <Link href={`/produto/${p.slug}`} className={styles.imgLink}>
        <div className={styles.imgBoxMinimal}>
          <span className={styles.statusTagMinimal}>{p.status}</span>
          <img src={p.img} alt={p.name} />
        </div>
      </Link>
      <div className={styles.infoBoxMinimal}>
        <span className={styles.brandMinimal}>{p.brand}</span>
        <h3 className={styles.nameMinimal}>{p.name}</h3>
        <div className={styles.priceRowMinimal}>
          <span className={styles.priceMinimal}>{p.price}</span>
          <Link href={`/produto/${p.slug}`} className={styles.textLinkMinimal}>
            VER DETALHES <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
