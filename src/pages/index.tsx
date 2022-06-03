import {GetStaticProps} from "next";
import Head from 'next/head';
import styles from '../styles/home.module.scss';

import {getPrismicClient} from "../services/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-dom';

type Content = {
    title: string;
    titleContent: string;
    titleImage: string
}

interface ContentProps{
    content: Content
}

export default function Home({content}:ContentProps) {

  return (
      <>
          <Head>
              <title>Venha mudar a sua vida!!</title>
          </Head>
          <main className={styles.container}>
              <div className={styles.containerHeader}>
                  <section className={styles.ctaText}>
                      <h1>{content.title}</h1>
                      <span>{content.titleContent}</span>
                      <a href={'/sorteios'}>
                          <button>
                              COMEÇAR AGORA!!
                          </button>
                      </a>
                  </section>
                  <img src={content.titleImage} alt=""/>
              </div>

          </main>
      </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();
    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'home')
    ])

    const {
        title, sub_title, home_image
    } = response.results[0].data;

    const content = {
        title: RichText.asText(title),
        titleContent: RichText.asText(sub_title),
        titleImage: home_image.url
    }
    return {
        props: {
            content
        },
        revalidate: 60 * 2 //A cada 2 minutos
    }

}
