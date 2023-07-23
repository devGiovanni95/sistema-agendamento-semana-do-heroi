import React, { useState } from 'react'
import { Header } from '../../components/Header'
import style from './Schedules.module.css'
import { InputSchedule } from '../../components/InputSchedule'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';
import { formatISO, getHours, parseISO, setHours } from 'date-fns';
import { api } from '../../server';
import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormValues{
    date: string;
    name: string;
    phone: string;
    hour: string;

}
export function Schedules() {
    const schema = yup.object().shape({
        phone: yup.string().required('Campo de telefone obrigatório'),
        name: yup.string().required('Campo de nome obrigatório'),
        date: yup.string().required('Campo de date obrigatório'),
        hour: yup.string().required('Campo de hora obrigatório'),
    })

    const { register, handleSubmit, formState:{errors} } = useForm<IFormValues>({resolver: yupResolver(schema)});
    const { availableSchedules, schedules, date, handleSetDate } = useAuth();
    const navigate = useNavigate();

    const [hourSchedule, setHourSchedule] = useState('');
    const currentData = new Date().toISOString().split('T')[0];
    const filteredDate = availableSchedules.filter((hour) => {
        const isScheduleAvailable = !schedules.find((scheduleItem) => {
            const scheduleDate = new Date(scheduleItem.date);
            const scheduleHour = getHours(scheduleDate);
            return scheduleHour === Number(hour);
        })
        return isScheduleAvailable;
    })
    console.log("🚀 ~ file: index.tsx:23 ~ filteredDate ~ filteredDate:", filteredDate);

    const handleChangeHour = (hour: string) => {
        setHourSchedule(hour);
    };

    const submit = handleSubmit(async ({name, phone, date, hour}) => {
        const formattedDate = formatISO(
            setHours(parseISO(date), parseInt(hourSchedule)),
        );
        try {
            await api.post('/schedules/',{
                name,
                phone,
                date: formattedDate
            })
            toast.success('Agemento efetuado com sucesso!')
            navigate('/dashboard')
        } catch (error) {
            if(isAxiosError(error)){
                toast.error(error.response?.data.message)
            }
        }
    })
    return (
        <div className={`${style.container} container`}>
            <Header />
            <h2>Agendamento de Horário</h2>

            <div className={style.formDiv}>
                <form onSubmit={submit}>
                    <InputSchedule
                        placeholder='Nome do cliente'
                        type='text'
                        {...register('name', { required: true })}
                        error={errors.name && errors.name.message}
                        />

                    <InputSchedule
                        placeholder='Celular'
                        type='text'
                        {...register('phone', { required: true })}
                        error={errors.phone && errors.phone.message}
                        />

                    <div className={style.date}>
                        <InputSchedule
                            placeholder='Dia'
                            type='date'
                            {...register('date', { required: true, value: currentData, onChange: (e)=> handleSetDate(e.target.value)})}
                            error={errors.date && errors.date.message}
                            />

                        <div className={style.select}>
                            <label htmlFor="">Hora</label>
                            <select
                                {...register('hour', {
                                    required: true,
                                    onChange: (e) => handleChangeHour(e.target.value)
                                })}>
                                {filteredDate.map((hour, index) => {
                                    return (
                                        <option value={hour} key={index}>
                                            {hour}:00
                                        </option>
                                    )
                                })}
                            </select>
                                {errors.hour && <span> {errors.hour.message}</span>}
                        </div>
                    </div>

                    <div className={style.footer}>
                        <button >Cadastrar</button>
                        <button >Editar</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Schedules
