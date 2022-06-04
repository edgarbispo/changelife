import { AppProps} from "next/app";

import '../styles/global.scss'
import {Header} from "../components/Header";

import { AuthProvider} from "../data/context/AuthContext";

function MyApp({ Component, pageProps }:AppProps) {
  return (
      <AuthProvider>
          <Header/>
          <Component {...pageProps}/>
      </AuthProvider>
  )
}

export default MyApp
