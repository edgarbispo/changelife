import Link from 'next/link'
import useAuth from "../../data/hook/useAuth";
import styles from './styles.module.scss'

export default function AvatarUsurio(){
    const {usuario} = useAuth()
    console.log(usuario?.imagemUrl)
    return(
        <Link href={"/perfil"}>
            <img src={usuario?.imagemUrl ?? '/images/avatar.png'}
                 alt="Usuário"
                 className={styles.avatarImg}
            />
        </Link>
    )
}
