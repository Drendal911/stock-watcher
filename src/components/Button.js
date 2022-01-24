import button from '../styles/components/button.module.scss';

export default function Button(props) {
    return (
        <div className={button.button} onClick={props.function}>
            {props.text}
        </div>
    )
}