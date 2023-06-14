import { NextFunction, Response, Request } from "express";
import { UsersService } from "../services/UsersService";


class UsersController {

    //inicializando variavel
    private usersService: UsersService;

    //instanciando objeto
    constructor() {
        this.usersService = new UsersService();
    }


    //buscar todos 
    index() {
    }

    //buscar somente um
    show() {

    }

    //criação do usuario
    async store(request: Request, response: Response, next: NextFunction) {
        //parametros buscados pela requisição
        const { name, email, password } = request.body;
        try {
            //criando nosso usuario
            const result = await this.usersService.create({ name, email, password });

            //resposta da solicitação
            return response.status(201).json(result);
        } catch (error) {
            next(error);
        }

    }

    //Autenticar o usuario
   async  auth(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        try {
            const result = await this.usersService.auth( email, password );

            return response.json(result);
        } catch (error) {
          next(error);           
        }

    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        const { refresh_token } = request.body;
        try {
          const result = await this.usersService.refresh(refresh_token);
          return response.json(result);
        } catch (error) {
          next(error);
        }
      }

    //Alterar dados
    async update(request: Request, response: Response, next: NextFunction) {
        const { name, oldPassword, newPassword } = request.body;
        const { user_id } = request;
        //testar o que estava passando
        //console.log(request.file);
        try {
            
            const result = await this.usersService.update({ 
                name, 
                oldPassword, 
                newPassword, 
                avatar_url : request.file, 
                user_id,
            });
            return response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}


export { UsersController };