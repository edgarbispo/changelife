import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logo.png'

import {ActiveLink} from "../ActiveLink";
import AvatarUsurio from "../template/AvatarUsuario";
import useAuth from "../../data/hook/useAuth";

export function Header(){

    const {usuario} = useAuth()

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink href={"/"} activeClassName={styles.active}>
                    <a>
                        <Image src={logo} alt={"Mude a sua vida!!"}/>
                    </a>
                </ActiveLink>

                <nav>
                    <ActiveLink href={"/"} activeClassName={styles.active}>
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink href={"/sorteios"} activeClassName={styles.active}>
                        <a>Sorteios</a>
                    </ActiveLink>
                    {usuario?.email &&
                        <ActiveLink href={"/apostas"} activeClassName={styles.active}>
                            <a>Minhas Apostas</a>
                        </ActiveLink>
                    }
                    <ActiveLink href={"/sobre"} activeClassName={styles.active}>
                        <a>Quem somos?</a>
                    </ActiveLink>

                </nav>

                <div className={styles.usuario}>

                    <AvatarUsurio/>
                    <a className={styles.readyButton}
                       href={'/autenticacao'}
                       type={"button"}>Cadastro Grátis
                    </a>

                </div>

            </div>
        </header>
    )
}
