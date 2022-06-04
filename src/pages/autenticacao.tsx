import {useState} from "react";
import styles from '../styles/autenticacao.module.scss'
import AuthInput from "../components/auth/AuthInput";

export default function Autenticacao(){

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return(
        <div className={styles.container}>
            <h1>Autenticação</h1>
            <AuthInput
                label={"Email"}
                valor={email}
                tipo={'email'}
                valorMudou={setEmail}
                obrigatorio
            />
            <AuthInput
                label={"Senha"}
                tipo={"password"}
                valor={senha}
                valorMudou={setSenha}
                obrigatorio
            />
        </div>
    )
}
