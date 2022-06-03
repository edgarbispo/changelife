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

type Sorteio = {
    slug: string,
    title: string,
    description: string,
    cover: string,
    updateAt: string,
}

interface SorteioProps{
    sorteios: Sorteio[],
    page: string,
    totalPage: string,
}

export default function Sorteios({sorteios:sorteiosPrismic, page, totalPage }: SorteioProps){

    const [currentPage, setCurrentPage] = useState(Number(page));
    const [sorteios, setSorteios] = useState(sorteiosPrismic || []);

    //Buscar novas sorteios
    async function reqSorteios(pageNumber: number){
        const prismic = getPrismicClient();

        const response = await prismic.query([
            Prismic.Predicates.at('document.type', 'sorteio')
        ],
        {
            orderings: '[document.last_publication_date]', //Ordenar pelo mais recente
            fetch: ['sorteio.title', 'sorteio.description', 'sorteio.cover'],
            pageSize: 3,
            page: String(pageNumber)
        })
        return response;
    }

    async function navigatePage(pageNumber: number) {
        const response = await reqSorteios(pageNumber);

        if (response.results.length === 0){
            return;
        }

        const getSorteios = response.results.map(sorteio => {
            return{
                slug: sorteio.uid,
                title: RichText.asText(sorteio.data.title),
                description: RichText.asText(sorteio.data.description),
                cover: sorteio.data.cover.url,
                updateAt: new Date(sorteio.last_publication_date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }

        })

        setCurrentPage(pageNumber);
        setSorteios(getSorteios);
    }

    return(
        <>
            <Head>
                <title>Sorteios | Change Life</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.sorteios}>
                    {sorteios.map( sorteio => (
                        <Link key={sorteio.slug} href={`/sorteios/${sorteio.slug}`}>
                            <a key={sorteio.slug}>
                                <Image src={sorteio.cover}
                                       alt={sorteio.title}
                                       width={720}
                                       height={410}
                                       quality={100}
                                       placeholder={"blur"}     // As propriedades placeholder e blurDataURL coloca uma cor antes de carregar a imagem
                                       blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8eepsPQAHpQLhss/HigAAAABJRU5ErkJggg=="}
                                />
                                <p/>
                                <strong>{sorteio.title}</strong>
                                <time>{sorteio.updateAt}</time>
                                <p>{sorteio.description}</p>
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
            Prismic.Predicates.at('document.type', 'sorteio'),
        ],
        {
            orderings: '[document.last_publication_date]', //Ordenar pelo mais recente
            fetch: ['sorteio.title', 'sorteio.description', 'sorteio.cover'],
            pageSize: 3
        })

    const sorteios = response.results.map(sorteio => {
        return{
            slug: sorteio.uid,
            title: RichText.asText(sorteio.data.title),
            description: RichText.asText(sorteio.data.description),
            cover: sorteio.data.cover.url,
            updateAt: new Date(sorteio.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }

    })

    return {
        props :{
            sorteios: sorteios,
            page: response.page,
            totalPage: response.total_pages
        },
        revalidate: 60 * 30 //Atualiza a cada 30 min
    }
}
