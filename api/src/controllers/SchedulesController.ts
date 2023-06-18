import { NextFunction, Request, Response } from "express";
import { SchedulesService } from "../services/SchedulesService";
import { parseISO } from "date-fns";

class SchedulesController{
    private schedulesService: SchedulesService;

    constructor(){
        this.schedulesService = new SchedulesService(); 
    }

    async store(request: Request, response: Response, next: NextFunction){
        const {name, phone, date } = request.body;
        try {
            const result = await this.schedulesService.create({name, phone, date});

            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async index(request: Request, response: Response, next: NextFunction){
       const {date } = request.query;
       const parseDate = date ? parseISO(date.toString()): new Date();
        try {
            const result = await this.schedulesService.index(parseDate);

            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    update(request: Request, response: Response, next: NextFunction){}
    delete(request: Request, response: Response, next: NextFunction){}
    
}
export {SchedulesController};