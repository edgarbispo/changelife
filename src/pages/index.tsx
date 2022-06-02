import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
      <>
          <Head>
              <title>Venha mudar a sua vida!!</title>
          </Head>
          <main className={styles.container}>
              <div className={styles.containerHeader}>
                  <section className={styles.ctaText}>
                      <h1>Levando você ao próximo nível!</h1>
                      <span>Uma plataforma com opções que podem mudar a sua vida!</span>
                      <a>
                          <button>
                              COMEÇAR AGORA!!
                          </button>
                      </a>
                  </section>
                  <img src="/images/conteudo.png" alt=""/>
              </div>

          </main>
      </>
  )
}
