import styles from './styles.module.scss'

<<<<<<< HEAD
interface AuthInputProps {
    label: string
    valor: any
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
=======
interface AuthInputProps{
    label: string,
    valor: any,
    obrigatorio?: boolean
>>>>>>> origin/main
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

<<<<<<< HEAD
export default function AuthInput(props:AuthInputProps) {
    return props.naoRenderizarQuando ? null : (
        <div className={styles.container}>
            <label>{props.label}</label>
            <input
                className={styles.input}
                type={props.tipo ?? 'text'}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target.value)}
                required={props.obrigatorio}
=======
export default function AuthInput(props: AuthInputProps){
    return(
        <div className={styles.container}>
            <label>{props.label}</label>
            <input
                type={props.tipo ?? 'text'}
                value={props.valor}
                onChange={e => props.valorMudou?.(e.target)}
                required={props.obrigatorio ?? false}
>>>>>>> origin/main
            />
        </div>
    )
}
