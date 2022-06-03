import {GetServerSideProps} from "next";
import styles from './sorteio.module.scss';

import {getPrismicClient} from "../../services/prismic";
import {RichText} from 'prismic-dom';

import Head from 'next/head';
import Image from 'next/image';

interface SorteioProps{
    sorteio: {
        slug: string,
        title: string,
        description: string,
        cover: string,
        updateAt: string,
    }
}

export default function Sorteio({sorteio}:SorteioProps){

    return(
        <>
            <Head>
                <title>{sorteio.title}</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.sorteio}>
                    <Image
                        quality={100}
                        src={sorteio.cover}
                        width={720}
                        height={410}
                        alt={sorteio.title}
                        placeholder={"blur"}
                        blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8eepsPQAHpQLhss/HigAAAABJRU5ErkJggg=="}
                    />
                    <h1>{sorteio.title}</h1>
                    <time>{sorteio.updateAt}</time>

                    <div className={styles.sorteioContent} dangerouslySetInnerHTML={{__html: sorteio.description}}></div>
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

    const {slug} = params;
    const prismic = getPrismicClient(req);

    const response = await prismic.getByUID('sorteio', String(slug), {});

    if (!response){
        return{
            redirect: {
                destination: '/sorteios',
                permanent: false
            }
        }
    }

    const sorteio = {
        slug: slug,
        title: RichText.asText(response.data.title),
        description: RichText.asHtml(response.data.description),
        cover: response.data.cover.url,
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props:{
            sorteio
        }
    }
}
