import Link from 'next/link'
import styles from './styles.module.scss'

import LoginMenu from "./LoginMenu";
import useAuth from "../../data/hook/useAuth";

export default function AvatarUsurio(){
    const {usuario} = useAuth()
    return(
        <>
            {usuario?.imagemUrl ?
                <LoginMenu/>
            :
                <Link href={"/autenticacao"}>
                    <img src={'/images/avatar.png'}
                         alt="Usuário"
                         className={styles.avatarImg}
                    />
                </Link>
            }
        </>
    )
}
