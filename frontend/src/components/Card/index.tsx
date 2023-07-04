import { RiDeleteBinFill } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import style from './Card.module.css'
import { ISchedules } from '../../interfaces/InterfaceLogin'
import { getHours, isAfter } from 'date-fns'
import { useState } from 'react'
import { ModalEdit } from '../ModalEdit'

export const Card = ({ name, date, id, phone }: ISchedules) => {
    const isAfterDate = isAfter(new Date(date), new Date());
    const [openModal, setOpenModal] = useState<boolean>(false);

    const dateFormatted = new Date(date);
    const hour = getHours(dateFormatted);

    let phoneFormatted = phone.replace(/\D/g, '');
    phoneFormatted = phoneFormatted.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3',
    )

    const handleChangeModal = () => {
        setOpenModal(!openModal)
    }

    return (
        <>
            <div className={style.background}>
                <div>
                    <span className={`${!isAfterDate && style.disabled}`}>
                        {hour}h
                    </span>

                    <p>
                        {name} - {phoneFormatted}
                    </p>
                </div>

                <div className={style.icons}>

                    <CiEdit
                        color='#5F6881'
                        size={25}
                        onClick={() => isAfterDate && handleChangeModal()}
                    />

                    <RiDeleteBinFill
                        color='#EB2E2E'
                        size={25}
                    />

                </div>
            </div>

            <ModalEdit
                isOpen={openModal}
                handleChangeModal={handleChangeModal}
                hour={hour}
                name={name}
            />
        </>
    )
}