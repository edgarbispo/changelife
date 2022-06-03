import {GetStaticProps} from "next";
import Head from 'next/head';

import styles from './styles.module.scss';
import Link from 'next/link';

import Image from 'next/image';

import {FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from "react-icons/fi";

import {getPrismicClient} from "../../services/prismic";
import Prismic from "@prismicio/client";
import {RichText} from 'prismic-dom';
import {useState} from "react";
import {any} from "prop-types";

// https://png-pixel.com    Site para pesquisar cor

type Disputa = {
    slug: string,
    title: string,
    description: string,
    cover: string,
    updateAt: string,
}

interface DisputaProps{
    disputas: Disputa[],
    page: string,
    totalPage: string,
}

export default function Disputas({disputas:disputasPrismic, page, totalPage }: DisputaProps){

    const [currentPage, setCurrentPage] = useState(Number(page));
    const [disputas, setDisputas] = useState(disputasPrismic || []);

    //Buscar novas disputas

    async function navigatePage(pageNumber: number) {

    }

    return(
        <>
            <Head>
                <title>Disputas | Change Life</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.disputas}>
                    {disputas.map( disputa => (
                        <Link key={disputa.slug} href={`/disputas/${disputa.slug}`}>
                            <a key={disputa.slug}>
                                <Image src={disputa.cover}
                                       alt={disputa.title}
                                       width={720}
                                       height={410}
                                       quality={100}
                                       placeholder={"blur"}     // As propriedades placeholder e blurDataURL coloca uma cor antes de carregar a imagem
                                       blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8eepsPQAHpQLhss/HigAAAABJRU5ErkJggg=="}
                                />
                                <p/>
                                <strong>{disputa.title}</strong>
                                <time>{disputa.updateAt}</time>
                                <p>{disputa.description}</p>
                            </a>
                        </Link>
                    ))}

                    <div className={styles.buttonNavigate}>
                        {Number(currentPage) >= 2 && (
                            <div>
                                <button onClick={() => navigatePage(1)}>
                                    <FiChevronsLeft size={25} color={"#FFF"}/>
                                </button>
                                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                                    <FiChevronLeft size={25} color={"#FFF"}/>
                                </button>
                            </div>
                        )}

                        {Number(currentPage) < Number(totalPage) && (
                            <div>
                                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                                    <FiChevronRight size={25} color={"#FFF"}/>
                                </button>
                                <button onClick={() => navigatePage(Number(totalPage))}>
                                    <FiChevronsRight size={25} color={"#FFF"}/>
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const prismic = getPrismicClient();
    const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'disputa'),
        ]
        , {
            orderings: '[document.last_publication_date]', //Ordenar pelo mais recente
            fetch: ['disputa.title', 'disputa.description', 'disputa.cover'],
            pageSize: 3
        })

    const disputas = response.results.map( disputa => {
        return{
            slug: disputa.uid,
            title: RichText.asText(disputa.data.title),
            description: RichText.asText(disputa.data.description),
            cover: disputa.data.cover.url,
            updateAt: new Date(disputa.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }

    })

    return {
        props :{
            disputas,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60 * 30 //Atualiza a cada 30 min
    }
}
