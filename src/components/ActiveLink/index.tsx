import Link, {LinkProps} from 'next/link';
import {ReactElement, cloneElement} from "react";
import {useRouter} from "next/router";

interface ActiveLinkProps extends LinkProps{
    children:ReactElement;
    activeClassName: string
}

export function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps){

    const {asPath} = useRouter(); //Se ele estiver na plagina blog, por exemplo

    const className = asPath === rest.href ? activeClassName : '';
    //Se a rota/pagina que estamos acessando for igual ao link que ele clicou entao ativamos o classname

    return(
        <Link {...rest}>
            {cloneElement(children, {
                className
            })}
        </Link>
    )
}
