import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import styles from './page.module.css';

export default function PoliticaPrivacidade() {
  return (
    <main className={styles.main}>
      <Header />
      
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.preTitle}>GUITAR GARAGE</span>
          <h1 className={styles.title}>POLÍTICAS DE<br /><span>PRIVACIDADE</span></h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.article}>
            <h2>1. Introdução</h2>
            <p>
              A Guitar Garage valoriza a privacidade dos seus clientes e visitantes. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso site.
            </p>

            <h2>2. Coleta de Dados</h2>
            <p>
              Coletamos informações que você nos fornece voluntariamente ao entrar em contato conosco via WhatsApp ou e-mail, como seu nome, telefone e endereço de e-mail. Também podemos coletar dados de navegação anônimos para melhorar a experiência do usuário.
            </p>

            <h2>3. Uso das Informações</h2>
            <p>
              Suas informações são utilizadas exclusivamente para:
            </p>
            <ul>
              <li>Responder a suas solicitações e dúvidas;</li>
              <li>Processar orçamentos e agendamentos de serviços;</li>
              <li>Informar sobre novidades e produtos exclusivos, caso você tenha solicitado.</li>
            </ul>

            <h2>4. Proteção de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração. Não vendemos ou compartilhamos seus dados com terceiros para fins de marketing.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
              Você tem o direito de solicitar o acesso, correção ou exclusão de seus dados pessoais a qualquer momento. Para isso, entre em contato através de nossos canais oficiais.
            </p>

            <h2>6. Alterações</h2>
            <p>
              Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente para estar ciente de qualquer mudança.
            </p>

            <p className={styles.date}>Última atualização: Abril de 2026.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
