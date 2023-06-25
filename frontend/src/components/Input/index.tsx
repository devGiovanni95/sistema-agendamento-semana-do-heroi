import { IInput } from '../../interfaces/InterfaceLogin';
import style from './Input.module.css';
import {MdEmail} from 'react-icons/md';

export const Input = ({placeholder}:IInput) => {
    return(
        <div className={style.container}>
            <label htmlFor="">
                <i aria-hidden="true">
                <MdEmail size={20}/>
                </i>
                <input type="text" placeholder={placeholder} />
            </label>
        </div>
    )
}