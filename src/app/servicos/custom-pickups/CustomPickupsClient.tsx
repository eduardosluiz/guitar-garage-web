"use client";

import { motion } from 'framer-motion';
import { Mic2, Zap, Target, ArrowRight, PlayCircle, Music } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function CustomPickupsClient({ banner, toneBanners, dynamicSamples }: { banner: any, toneBanners?: any, dynamicSamples?: string[] }) {
  const router = useRouter();
  
  // Usar samples reais se existirem, senão usar os mocks padrão
  const samples = dynamicSamples || [
    "Two Tone - NECK (Solon Fishbone)",
    "Two Tone - NECK/ MIDDLE (Solon Fishbone)",
    "Two Tone - MIDDLE (Solon Fishbone)",
    "Two Tone - MIDDLE/ BRIDGE (Solon Fishbone)",
    "Two Tone - BRIDGE (Solon Fishbone)",
    "Three - NECK (Solon Fishbone)",
    "Three - NECK/ MIDDLE (Solon Fishbone)",
    "Three - MIDDLE (Solon Fishbone)",
    "Three - MIDDLE/ BRIDGE (Solon Fishbone)",
    "Three - BRIDGE (Solon Fishbone)"
  ];

  const toneCards = [
    {
      slug: 'two-tone',
      title: toneBanners?.['card-two-tone']?.titulo ?? "TWO TONE",
      description: toneBanners?.['card-two-tone']?.subtitulo ?? toneBanners?.['two-tone']?.subtitulo ?? "Alma dos anos 60 com timbre cristalino e dinâmico. Um kit que transporta seu instrumento diretamente para a era de ouro do rock e blues.",
      icon: <Zap size={32} />,
      img: toneBanners?.['card-two-tone']?.imagemUrl || toneBanners?.['two-tone']?.imagemUrl || "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800",
      href: "/servicos/custom-pickups/two-tone"
    },
    {
      slug: 'three-tone',
      title: toneBanners?.['card-three-tone']?.titulo ?? "THREE TONE",
      description: toneBanners?.['card-three-tone']?.subtitulo ?? toneBanners?.['three-tone']?.subtitulo ?? "O melhor timbre de Blues. Um set equilibrado com corpo e sustain excepcionais, reconhecido por profissionais pela sua fidelidade e calor.",
      icon: <Mic2 size={32} />,
      img: toneBanners?.['card-three-tone']?.imagemUrl || toneBanners?.['three-tone']?.imagemUrl || "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=800",
      href: "/servicos/custom-pickups/three-tone"
    },
    {
      slug: 'buttertone',
      title: toneBanners?.['card-buttertone']?.titulo ?? "BUTTERTONE",
      description: toneBanners?.['card-buttertone']?.subtitulo ?? toneBanners?.['buttertone']?.subtitulo ?? "O clássico twang das Telecasters dos anos 50. Timbre encorpado e rasgado aos moldes das lendárias Butterscotch Blondes.",
      icon: <Target size={32} />,
      img: toneBanners?.['card-buttertone']?.imagemUrl || toneBanners?.['buttertone']?.imagemUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
      href: "/servicos/custom-pickups/buttertone"
    }
  ];

  return (
    <>
      <section 
        className={styles.hero}
        style={{ 
          backgroundImage: banner?.imagemUrl ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${banner.imagemUrl}')` : 'none',
          backgroundColor: banner?.imagemUrl ? 'transparent' : '#0A0A0A',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={styles.heroContent}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.preTitle}>
            {banner?.preTitulo || 'TONE CHASING'}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className={styles.title}>
            {banner?.titulo ? (
              <>
                {banner.titulo.split(' ').slice(0, -1).join(' ')}<br />
                <span>{banner.titulo.split(' ').slice(-1)}</span>
              </>
            ) : (
              <>
                GG CUSTOM<br /><span>HANDWOUND PICKUPS.</span>
              </>
            )}
          </motion.h1>
        </div>
      </section>

      {/* GG CUSTOM PICKUPS - AGORA É A PRIMEIRA SEÇÃO APÓS O HERO */}
      <section className={styles.teleSet}>
        <div className={styles.container}>
          <div className={styles.textContentFull}>
            <span className={styles.preTitle}>TONE EXPERTISE</span>
            <h2>GG CUSTOM<br /><span>PICKUPS</span></h2>
            <div className={styles.divider}></div>
            
            <div className={styles.textGridTwoCols}>
              <div className={styles.col}>
                <p>Os captadores da Guitar Garage foram desenvolvidos nos ano de 2003/.2004. Quando nada se fazia no Brasil na época, o guitarrista e proprietário da loja Solon Fishbone mergulhou na tarefa de tentar replicar o som mágico das guitarras Fender dos anos 50/ 60.</p>
                <p>O músico ja era fascinado pelo timbre dessas guitarras por usa-las desde 1996 quando adquiriu sua primeira “pré CBS”, uma strato 1964 comprada na extinta Voltage Guitars de Los Angeles. De lá pra cá já passaram pela Guitar Garage pelo menos uma dúzia dessas guitarras. 56/60/61/63/64/65 sendo vários exemplares da cada ano .</p>
              </div>
              <div className={styles.col}>
                <p>Um pickup de guitarra é algo extremamente simples. Imagine algo desenvolvido nos anos 1940. Consiste apenas de imãs com uma bobina de fio de cobre enrolado. Então onde está o mistério do timbre mágico dessas guitarras?</p>
                <p>Certamente trata-se de um conjunto, desde a madeira antiga e seca até as ligas dos metais que compõem o hardware de um instrumento de 60 anos. Certas coisas só o tempo pode fazer, mas o fio, a distribuição e tensão do enrolamento, e o controle sobre a potência da magnetização dos polos são variantes possíveis de se controlar. Apartir dessas premissas foram desenvolvidos os pickups da Guitar Garage.</p>
                <button className={styles.ctaBtn} style={{ marginTop: '2rem' }}>SOLICITAR ORÇAMENTO <ArrowRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TONES SECTION COM TÍTULO PREMIUM E RISCO */}
      <section className={styles.tonesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderPremium} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', marginBottom: '4rem', paddingTop: '8rem' }}>
            <div className={styles.titleStacked}>
              <span className={styles.preTitle}>PICKUP MODELS</span>
              <h2>ESCOLHA SEU<br /><span>TIMBRE</span></h2>
            </div>
            <a href="https://soundcloud.com/guitargarage-1" target="_blank" className={styles.externalLink}>
              SOUNDCLOUD OFICIAL <ArrowRight size={16}/>
            </a>
          </div>

          <div className={styles.servicesGrid} style={{ padding: '0 0 10rem 0' }}>
            {toneCards.map((item, index) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={styles.serviceCard}
              >
                <div className={styles.cardImage}>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.iconOverlay}>{item.icon}</div>
                </div>
                <Link href={item.href} className={styles.cardContent} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className={styles.ctaBtn} style={{ padding: '0.7rem 1.5rem', fontSize: '0.65rem' }}>
                    OUVIR SAMPLES <ArrowRight size={16}/>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
