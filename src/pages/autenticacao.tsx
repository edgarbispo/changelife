import {useState} from "react";
import styles from '../styles/autenticacao.module.scss'
import AuthInput from "../components/auth/AuthInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import useAuth from "../data/hook/useAuth";

export default function Autenticacao(){

    const {cadastrar, usuario, login, loginGoogle} = useAuth()

    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(null)

    function exibirErro(msg, tempoSegundos = 5) {

        setErro(msg)
        setTimeout(() => setErro(null), tempoSegundos * 1000)

    }

    async function submeter(){
        try {
            if (modo === 'login') {
                await login(email, senha)
            } else {
                await cadastrar(email, senha)
            }
        } catch (e) {
            console.log(e)
            exibirErro(e?.message ?? 'Erro ao realizar o login')
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.login}>
                <h1>
                    {modo === 'login' ? 'Entre com a Sua Conta' : 'Cadastre-se na Plataforma'}
                </h1>

                {erro ? (
                    <div className={styles.erro}>
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        <span>{erro}</span>
                    </div>
                ) : false}

                <AuthInput
                    label={"Email"}
                    tipo={"email"}
                    valor={email}
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

                <button
                    className={styles.botaologin}
                    onClick={submeter}
                >
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className={styles.divisor}/>

                <button
                    className={styles.botaogoogle}
                    onClick={loginGoogle}
                >
                    Entrar com Google
                </button>

                {modo === 'login' ? (
                    <p className={styles.paragrafoUsuario}>
                        Preparado para mudar?
                        <a className={styles.usuario}
                            onClick={() => setModo('cadastro')}
                        > Crie uma Conta Gratuitamente</a>
                    </p>
                ) : (
                    <p className={styles.paragrafoUsuario}>
                        Já faz parte da nosso comunidade?
                        <a className={styles.usuario}
                           onClick={() => setModo('login')}
                        > Entre com as Suas Credenciais</a>
                    </p>
                )}

            </div>

        </div>
    )
}
