import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons';

import {ActiveLink} from "../ActiveLink";

export function Header(){
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
                    <ActiveLink href={"/disputas"} activeClassName={styles.active}>
                        <a>Disputas</a>
                    </ActiveLink>
                    <ActiveLink href={"/sobre"} activeClassName={styles.active}>
                        <a>Quem somos?</a>
                    </ActiveLink>
                </nav>

                <a className={styles.userIcon}>
                    <FontAwesomeIcon icon={faUser} size="2x"/>
                </a>

                <a className={styles.readyButton} type={"button"}>COMEÇAR</a>

            </div>
        </header>
    )
}