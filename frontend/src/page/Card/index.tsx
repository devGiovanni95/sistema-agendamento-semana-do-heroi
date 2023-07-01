import { RiDeleteBinFill } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import style from './Card.module.css'

export const Card = () => {
    return(
        <div className={style.background}>
            <div>
                <span>10h</span>
                <p>Giovanni Almeida</p>
            </div>
            <div className={style.icons}>
                <RiDeleteBinFill color='#EB2E2E'/>
                <CiEdit color='#5F6881 '/>
            </div>
        </div>
    )
}