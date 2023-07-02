import { RiDeleteBinFill } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import style from './Card.module.css'
import { ISchedules } from '../../interfaces/InterfaceLogin'
import { getHours, isAfter } from 'date-fns'

export const Card = ({name, date, id, phone}: ISchedules) => {
    const isAfterDate = isAfter(new Date(), new Date());

    let phoneFormatted = phone.replace(/\D/g, '');
    phoneFormatted = phoneFormatted.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3', 
    )

    return(
        <div className={style.background}>
            <div>
                <span className={`${!isAfterDate && style.disabled}`}>
                    {getHours(new Date(date))}h
                </span>

                <p>
                    {name} - {phoneFormatted}
                </p>
            </div>

            <div className={style.icons}>
                <RiDeleteBinFill color='#EB2E2E' size={20}/>
                <CiEdit color='#5F6881' size={20} />
            </div>
        </div>
    )
}