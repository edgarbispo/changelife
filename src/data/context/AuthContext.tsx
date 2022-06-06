import route from "next/router";
import firebase from '../../firebase/config'
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'

import {createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie'

import Usuario from '../../model/Usuario'

interface AuthContextProps{
    usuario?: Usuario
    carregando?: boolean
    cadastrar?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase ): Promise<Usuario>{
    const token = await usuarioFirebase.getIdToken()
    return{
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean){
    if (logado) {
        Cookies.set('changelife', logado, {
            expires: 7  //Qtde de Dias
        })
    } else {
        Cookies.remove('changelife')
    }
}

export function AuthProvider(props) {

    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>(null)

    const auth = getAuth();

    async function configurarSessao(usuarioFirebase) {
        if(usuarioFirebase?.email){

            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email

        } else {

            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false

        }
    }

    async function cadastrar(email, senha){
        try{
            setCarregando(true)
            const resp = await createUserWithEmailAndPassword(getAuth(firebase), email, senha)

            configurarSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }

    }

    async function loginGoogle(){
        try{
            setCarregando(true)
            const resp = await signInWithPopup(getAuth(firebase),
                new GoogleAuthProvider())

            await configurarSessao(resp.user)
            route.push('/')
        } finally {
            setCarregando(false)
        }

    }

    async function login(email, senha ){
        try{
            setCarregando(true)

            const resp = await signInWithEmailAndPassword(auth, email, senha)

            configurarSessao(resp.user)
            route.push('/')

        } finally {
            setCarregando(false)
        }

    }

    async function logout(){
        try{
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)
            route.push('/')
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {

        if (Cookies.get('changelife')){
            const cancelar = auth.onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            //setCarregando(null)
        }
    }, [])

    return(
        <AuthContext.Provider value={{
            usuario,
            carregando,
            login,
            cadastrar,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
