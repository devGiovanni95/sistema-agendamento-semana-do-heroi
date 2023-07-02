import { DayPicker } from "react-day-picker";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/auth";
import style from './Dashboard.module.css';
import 'react-day-picker/dist/style.css'
import { Card } from "../Card";
import { useEffect, useState } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { format, isToday } from "date-fns";
import { api } from "../../server";
import { ISchedules } from "../../interfaces/InterfaceLogin";

export function Dashboard() {
    const [date, setDate] = useState(new Date());
    const { user } = useAuth();
    const [schedules, setSchedules] = useState<Array<ISchedules>>();

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    }
    const isWeekDay = (date: Date) => {
        const day = date.getDay();
        return day != 0 && day != 6;
    }
    const handleDataChange = (date: Date)=>{
        setDate(date);
    }

    useEffect(() => {
        api.get('schedules', {
            params: {
                date,
            }
        }).then((response) => {
            console.log("🚀 ~ file: index.tsx:33 ~ useEffect ~ response:", response)
            /*Passando a resposta da requisição */
            setSchedules(response.data)
            
        }).catch((error)=> console.log(error));
    },[date])

    return (
        <div className="container">
            <Header />
            <div className={style.dataTitle}>
                <h2>Bem vindo(a), {user.name} </h2>
                <p>Esta é a sua lista de horários {isToday(date) && <span>de hoje, </span>} dia {format(date,'dd/MM/yyyy')}</p>
            </div>
            <h2 className={style.nextSchedules}>Próximos Horários</h2>
            <div className={style.schedule}>
                <div className={style.cardWrapper}>

                    {schedules?.map((schedule, index) => {                        
                        return(
                            <Card 
                                key={index}
                                date={schedule.date}
                                name={schedule.name}
                                id={schedule.id} 
                                phone={schedule.phone}
                            />

                        ) 
                    })}

                </div>
                <div className={style.picker}>
                    <DayPicker
                        className={style.calendar}
                        classNames={{
                            day: style.day,
                        }}
                        selected={date}
                        mode="single" 
                        disabled={ isWeekend }
                        modifiers={ {available : isWeekDay} }
                        modifiersClassNames={{
                            selected: style.selected,
                        }}
                        onDayClick={handleDataChange}
                        locale={ptBR}
                        /*fromMonth={new Date()}*/
                    />
                </div>
            </div>
        </div>
    )
}