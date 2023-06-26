import { IButton } from "../../interfaces/InterfaceLogin"
import style from "./Button.module.css"

export const Button = ({text}: IButton)=> {
    return(
        <button className={style.button}>
            <span>
                {text}
            </span>
        </button>
    )
}