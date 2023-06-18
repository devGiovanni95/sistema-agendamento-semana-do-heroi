
import { ICreate } from "../interfaces/SchedulesInterface";
import { getHours, isBefore, startOfHour } from "date-fns";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService{

    private schedulesRepository: SchedulesRepository;
    constructor(){
        this.schedulesRepository = new SchedulesRepository();
    }
    
    async create({name, phone, date}: ICreate){
        
        const dateFormatted = new Date(date);

        const hourStart = startOfHour(dateFormatted);

        if(isBefore(hourStart, new Date())){
            throw new Error('It is not allowed to schedule old date  - Não é permitido agendar em uma data antiga');
            
        }
        
        const checkIsAvailable = await this.schedulesRepository.find(hourStart);

        if(checkIsAvailable){
            throw new Error('Schedule date is not avaliable - Agendamento de data não Disponível');
        }

        const create = await this.schedulesRepository.create({
            name,
            phone, 
            date:hourStart
        });

        return create;
    }
    async index(date: Date){
        const result = await this.schedulesRepository.findAll(date);
        return result;
    }

    async update(id: string, date: Date){
        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted);

        //pegar hora
        const hour = getHours(dateFormatted);

        //comparando as horas
        if(hour < 9 || hour > 19){
            throw new Error('Create Schedules between 9 and 19 - Crie o Agendamento entre 9 e 19 horas.');
        }


        if(isBefore(hourStart, new Date())){
            throw new Error('It is not allowed to schedule old date - Não é permitido agendar em uma data antiga.');            
        }
        
        const checkIsAvailable = await this.schedulesRepository.find(hourStart);

        if(checkIsAvailable){
            throw new Error('Schedule date is not avaliable - Agendamento de data não Disponível');
        }

        const result = await this.schedulesRepository.update(id, date);
        return result;
    }
}
export {SchedulesService}