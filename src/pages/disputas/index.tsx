import Head from 'next/head';

import styles from './styles.module.scss';
import Link from 'next/link';

import Image from 'next/image';
import thumbImg from '../../../public/images/thumb.png'

import {FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight} from "react-icons/fi";

export default function Disputas(){
    return(
        <>
            <Head>
                <title>Disputas | Change Life</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.disputas}>
                    <Link href={"/"}>
                        <a>
                            <Image src={thumbImg}
                                   alt={"Disputa 1"}
                                   width={720}
                                   height={410}
                                   quality={100}
                            />
                            <p/>
                            <strong>Realizando a 1a disputa</strong>
                            <time>06 de Junho 2022</time>
                            <p>Lorem ipsum dolor sit amet. Non maxime quaerat At sequi aperiam non rerum voluptates sed aspernatur natus et deleniti sunt et sapiente deleniti.</p>
                        </a>
                    </Link>

                    <div className={styles.buttonNavigate}>
                        <div>
                            <button>
                                <FiChevronsLeft size={25} color={"#FFF"}/>
                            </button>
                            <button>
                                <FiChevronLeft size={25} color={"#FFF"}/>
                            </button>
                        </div>
                        <div>
                            <button>
                                <FiChevronRight size={25} color={"#FFF"}/>
                            </button>
                            <button>
                                <FiChevronsRight size={25} color={"#FFF"}/>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
