import { NextFunction, Response, Request } from "express";
import { UsersService } from "../services/UsersService";

class UsersController{

    //inicializando variavel
    private usersService: UsersService

    //instanciando objeto
    constructor(){
        this.usersService = new UsersService();
    }

 
    //buscar todos 
    index(){
    }

    //buscar somente um
    show(){

    }

    //criação do usuario
    async store(request: Request, response: Response, next: NextFunction){
        //parametros buscados pela requisição
        const {name, email, password } = request.body;
        try {
            //criando nosso usuario
            const result = await this.usersService.create({name, email, password});

                //resposta da solicitação
            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }

    }

    //Autenticar o usuario
    auth(){

    }

    //Alterar dados
    update(request: Request, response: Response, next: NextFunction){
        const {name, oldPassword, newPassword} = request.body;
        console.log(request.files);
        try{

        }catch(error){
            next(error);
        }     
    }
}


export {UsersController};