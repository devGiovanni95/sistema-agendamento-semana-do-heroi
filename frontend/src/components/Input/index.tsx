import { ForwardRefRenderFunction, forwardRef } from 'react';
import { IInput } from '../../interfaces/InterfaceLogin';
import style from './Input.module.css';


const InputBase: ForwardRefRenderFunction < HTMLInputElement, IInput > = (
         { placeholder, type, error, icon,  ...rest },
            ref,
    ) => {

    return(
        <div className={style.container}>
            <label htmlFor="">
                <i aria-hidden="true">
                    {icon}
                </i>
                <input type={type} placeholder={placeholder} ref={ref} {...rest}/>
            </label>
            {error && <span>{error}</span>}
        </div>
    )
}

export const Input = forwardRef(InputBase);