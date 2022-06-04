import route from "next/router";
import firebase from '../../firebase/config'
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from 'firebase/auth'
import {createContext, useState} from "react";

import Usuario from '../../model/Usuario'

interface AuthContextProps{
    usuario?: Usuario
    loginGoogle?: () => Promise<void>
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

export function AuthProvider(props) {

    const [usuario, setUsuario] = useState<Usuario>(null)

    async function loginGoogle(){
        const resp = await signInWithPopup(getAuth(firebase),
            new GoogleAuthProvider())

        if (resp.user?.email) {
            const usuario = await usuarioNormalizado(resp.user)
            setUsuario(usuario)
            route.push('/')
        }
    }

    return(
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
