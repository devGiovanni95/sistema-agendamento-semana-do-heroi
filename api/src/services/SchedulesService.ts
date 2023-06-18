
import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from "date-fns";
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
            throw new Error('It is not allowed to schedule old date');
            
        }
        
        const checkIsAvailable = await this.schedulesRepository.find(hourStart);

        if(checkIsAvailable){
            throw new Error('Schedule date is not avaliable');
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
        console.log(result.toString())
        return result;
    }
}
export {SchedulesService}