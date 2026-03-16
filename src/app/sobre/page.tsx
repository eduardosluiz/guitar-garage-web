"use client";

import { motion } from 'framer-motion';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import styles from './page.module.css';

export default function Sobre() {
  return (
    <main className={styles.main}>
      <Header />

      {/* HERO INSTITUCIONAL */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.preTitle}
          >
            NOSSA HISTÓRIA
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            CURADORIA PARA<br /><span>O TIMBRE PERFEITO.</span>
          </motion.h1>
        </div>
      </section>

      {/* CONTEÚDO HISTÓRIA - CENTRALIZADO E LARGO */}
      <section className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.textBlockFull}
        >
          <h2 className={styles.homeStyleTitle}>
            Um Conceito <span>Diferenciado</span>
          </h2>
          <div className={styles.textContentSingle}>
            <p>
              A Guitar Garage nasceu da idéia de um conceito diferenciado de loja, e oferece aos seus clientes instrumentos e atendimento também diferenciados. 
              Aqui você não vai encontrar um vendedor pressionado em busca de metas, nosso atendimento objetiva ajudar aquele que busca um instrumento, seja ele qual for, a encontrá-lo. 
              Mesmo que a melhor opção não esteja em nosso estoque.
            </p>
            <p>
              Nossa filosofia é contrária à dominante, somos uma espécie de "slow food" no mercado de instrumentos musicais. 
              Somos especializados em instrumentos antigos e raros, mas também trabalhamos com uma linha mais acessível, mantendo a qualidade e a concepção Vintage.
            </p>
            <p>
              Por que Vintage? Por que os instrumentos antigos soam diferente dos novos? 
              No texto abaixo um pouco sobre este assunto, leiam e divirtam-se.
            </p>
          </div>
        </motion.div>
      </section>

      {/* TEXTO SOLON FISHBONE */}
      <section className={styles.quoteSection}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.quoteContent}
        >
          <p className={styles.quoteText}>
            "Quando se tem o privilégio de tocar num instrumento antigo, não se tem só uma guitarra com um timbre maravilhoso e resonante, mas também uma parte da história da música pop nas mãos. 
            O que seria de Buddy Holly sem uma? E que tal Jimi Hendrix? Esses instrumentos mais do que tudo personificam o surgimento de uma cultura, de uma forma de vida."
          </p>
          
          <div className={styles.longText}>
            <p>
              Uma guitarra vintage é uma obra de arte, tal qual um quadro, ou seja, um investmento. 
              Desde a criação das guitarras elétricas clássicas como Gibson Les Paul, Fender Stratocaster, Telecaster ou Rickenbackers a mais ou menos 50 anos atrás, quase tudo se tentou em termos de inovação e design, toda a tecnologia foi aplicada na tentativa de aprimorá-las, mas tudo que se conseguiu com poucas exceções foi chegar-se a conclusão de que esses projetos criados a meio século, de nada mais precisam. 
              Dessa maneira os instrumentos Top of line fabricados hoje em dia, desprezam a tecnologia automatizada e são nada mais nada menos que fiéis recriações das originais.
            </p>

            <p>
              Desde 2002 a Guitar Garage com pioneirismo e coragem traz um pouco desta cultura aos músicos brasileiros. 
              Nossa luta é para oferecer o que há de melhor em termos de instrumentos musicais, seja para músicos que, como nós, buscam o timbre e a personalidade mágica que só um instrumento antigo nos oferece, ou mesmo para apreciadores e colecionadores que sabem dar importância devida a esses verdadeiros ícones da cultura pop do século XX."
            </p>
          </div>

          <span className={styles.author}>— Solon Fishbone</span>
        </motion.div>
      </section>

      {/* SEÇÃO DO FUNDADOR */}
      <section className={styles.ownerSection}>
        <div className={styles.ownerContainer}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className={styles.ownerImageWrapper}
          >
            <img 
              src="/solonfishbone.jpg" 
              alt="Solon Fishbone - Guitar Garage" 
              className={styles.ownerImage}
            />
          </motion.div>
          <div className={styles.ownerCaption}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              SOLON FISHBONE
            </motion.p>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Fundador e Curador
            </motion.span>
          </div>
        </div>
      </section>

      {/* FILOSOFIA RESUMO */}
      <section className={styles.philosophy}>
        <div className={styles.phiContent}>
          <div className={styles.phiItem}>
            <span className={styles.number}>01</span>
            <h3>VINTAGE</h3>
            <p>Especialistas em instrumentos raros e com história.</p>
          </div>
          <div className={styles.phiItem}>
            <span className={styles.number}>02</span>
            <h3>SLOW RETAIL</h3>
            <p>Atendimento focado em encontrar o instrumento certo, sem pressa.</p>
          </div>
          <div className={styles.phiItem}>
            <span className={styles.number}>03</span>
            <h3>LEGADO</h3>
            <p>Trazendo a cultura do timbre clássico aos músicos brasileiros desde 2002.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
