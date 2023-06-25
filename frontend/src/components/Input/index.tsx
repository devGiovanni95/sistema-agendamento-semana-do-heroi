import { ForwardRefRenderFunction, forwardRef } from 'react';
import { IInput } from '../../interfaces/InterfaceLogin';
import style from './Input.module.css';
import {MdEmail} from 'react-icons/md';

const InputBase: ForwardRefRenderFunction < HTMLInputElement, IInput > = (
         { placeholder, type,error, ...rest },
            ref,
    ) => {

    return(
        <div className={style.container}>
            <label htmlFor="">
                <i aria-hidden="true">
                <MdEmail size={20}/>
                </i>
                <input type={type} placeholder={placeholder} ref={ref} {...rest}/>
            </label>
            {error && <span>{error}</span>}
        </div>
    )
}

export const Input = forwardRef(InputBase);