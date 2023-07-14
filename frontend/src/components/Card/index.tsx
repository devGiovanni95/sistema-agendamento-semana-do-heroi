import { RiDeleteBinFill } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import style from './Card.module.css'
import { ISchedules } from '../../interfaces/InterfaceLogin'
import { getHours, isAfter } from 'date-fns'
import { useState } from 'react'
import { ModalEdit } from '../ModalEdit'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import { api } from '../../server'

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

    const handleDelete = async ()=> {
        try {
           const result = await api.delete(`/schedules/${id}`);
            toast.success('Deleted successfully');
           console.log("🚀 ~ file: index.tsx:33 ~ handleDelete ~ result:", result)
        } catch (error) {
            if(isAxiosError(error)){
                toast.error(error.response?.data.message);
            }
        }
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
                        onClick={() => isAfterDate && handleDelete()}
                        />

                </div>
            </div>

            <ModalEdit
                isOpen={openModal}
                handleChangeModal={handleChangeModal}
                hour={String(hour)}
                id={id}
                name={name}
            />
        </>
    )
}