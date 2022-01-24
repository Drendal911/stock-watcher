import inputCSS from '../styles/components/input.module.scss'

export default function Input(props) {
    return (
        <>
            {props.required === 'yes' ?
                <div className={inputCSS.container}>
                    <label htmlFor="stock" className={inputCSS.label}/>
                    <input id="stock" type="text" className={inputCSS.input} ref={props.input}
                           placeholder={props.placeholder} required/>
                </div>
                :
                <div className={inputCSS.container}>
                    <label htmlFor="stock" className={inputCSS.label}/>
                    <input id="stock" type="text" className={inputCSS.input} ref={props.input}
                           placeholder={props.placeholder}/>
                </div>}
        </>
    )
}