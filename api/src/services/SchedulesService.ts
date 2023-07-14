
import { ICreate } from "../interfaces/SchedulesInterface";
import { getHours, isBefore, startOfHour } from "date-fns";
import { SchedulesRepository } from "../repositories/SchedulesRepository";

class SchedulesService{

    private schedulesRepository: SchedulesRepository;
    constructor(){
        this.schedulesRepository = new SchedulesRepository();
    }
    
    async create({name, phone, date, user_id}: ICreate){
        
        const dateFormatted = new Date(date);

        const hourStart = startOfHour(dateFormatted);
        
        //pegar hora
        const hour = getHours(hourStart);

        //comparando as horas
        if(hour <= 8 || hour > 20){
            throw new Error('Create Schedules between 9 and 19 - Crie o Agendamento entre 9 e 19 horas.');
        }


        if(isBefore(hourStart, new Date())){
            throw new Error('It is not allowed to schedule old date  - Não é permitido agendar em uma data antiga');
            
        }
        
        const checkIsAvailable = await this.schedulesRepository.find(hourStart,user_id);

        if(checkIsAvailable){
            throw new Error('Schedule date is not avaliable - Agendamento de data não Disponível');
        }

        const create = await this.schedulesRepository.create({
            name,
            phone, 
            date: hourStart,
            user_id,
        });

        return create;
    }
    
    async index(date: Date){
        const result = await this.schedulesRepository.findAll(date);
        return result;
    }

    async update(id: string, date: Date, user_id: string){
        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted);

        if(isBefore(hourStart, new Date())){
            throw new Error('It is not allowed to schedule old date - Não é permitido agendar em uma data antiga.');            
        }
        
        const checkIsAvailable = await this.schedulesRepository.find(
            hourStart, 
            user_id,
            );

        if(checkIsAvailable){
            throw new Error('Schedule date is not avaliable - Agendamento de data não Disponível');
        }

        const result = await this.schedulesRepository.update(id, date);
        return result;
    }

    async delete(id: string) {
        const checkExists = await this.schedulesRepository.findById(id);
    
        if (!checkExists) {
          throw new Error('Schedule does not exists');
        }
    
        const result = await this.schedulesRepository.delete(id);
    
        return result;
      }
}
export {SchedulesService}