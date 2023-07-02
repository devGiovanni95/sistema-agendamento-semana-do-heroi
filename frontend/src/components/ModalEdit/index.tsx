import { AiOutlineClose } from 'react-icons/ai'
import style from './ModalEdit.module.css'
import { IModal } from '../../interfaces/InterfaceLogin'

export function ModalEdit({ isOpen, handleChangeModal }: IModal) {
    const currentData = new Date().toISOString().split('T')[0]

    if (isOpen) {

        return (
            <div className={style.background}>
                <div className={style.modal}>
                    <div className={style.header}>
                        <h2>Editar Horário</h2>
                        <AiOutlineClose size={30} onClick = {handleChangeModal}/>
                    </div>

                    <div className={style.body}>
                        <p>7h Giovanni </p>

                        <div className={style.input}>
                            <label htmlFor="">
                                Indique uma nova data
                            </label>
                            <input type="date" defaultValue={currentData}/>
                        </div>

                        <div className={style.input}>
                            <label htmlFor="">
                                Indique uma novo horário
                            </label>
                            <select name="" id="">
                                <option value="">13:00</option>
                                <option value="">13:00</option>
                                <option value="">13:00</option>
                                <option value="">13:00</option>
                            </select>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <button onClick={handleChangeModal}>Cancelar</button>
                        <button>Editar</button>
                    </div>
                </div>
            </div>
        )

    } else {

        return <></>

    }
}