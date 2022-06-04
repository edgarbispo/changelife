import styles from './styles.module.scss'

interface AuthInputProps{
    label: string,
    valor: any,
    obrigatorio?: boolean
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps){
    return(
        <div className={styles.container}>
            <label>{props.label}</label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target)}
                required={props.obrigatorio ?? false}
            />
        </div>
    )
}
