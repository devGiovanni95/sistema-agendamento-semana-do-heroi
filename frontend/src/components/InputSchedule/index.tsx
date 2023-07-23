import { ForwardRefRenderFunction, forwardRef } from 'react';
import { IInput } from '../../interfaces/InterfaceLogin';
import style from './InputSchedule.module.css'; 


const InputBase: ForwardRefRenderFunction < HTMLInputElement, IInput > = (
         { placeholder, type, error, icon,  ...rest },
            ref,
    ) => {

    return(
        <div className={style.container}>
            <label htmlFor="">
                {placeholder}
            </label>

                <input type={type} placeholder={placeholder} ref={ref} {...rest}/>
            {error && <span>{error}</span>}
        </div>
    )
}

export const InputSchedule = forwardRef(InputBase);