import styles from './styles.module.scss'

interface AuthInputProps{
    label: string,
    valor: any,
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean,
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void,
}

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
            />
        </div>
    )
}
