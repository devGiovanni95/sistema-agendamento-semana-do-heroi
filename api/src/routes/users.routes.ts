import { Router, request, response } from "express";
import { UserController } from "../controllers/UsersController";

//trabalhando com classes
class UsersRoutes{
    //inicializa uma variavel do router
    private router: Router;

    //inicializa uma variavel do tipo UserController criado em outra classe
    private usersController: UserController;

    //Pra chamar sempre o Router quando inicializar a classe com a variavel criada acima
    constructor(){
        this.router = Router();
        //instancia a classe pra sempre ser inicializada
        this.usersController = new UserController();

    }

    //Recebe todos os metodos de router
    getRoutes(){
        this.router.post(
            '/', 
            this.usersController.store.bind(this.usersController),
        );

        return this.router;
    }
}

export {UsersRoutes}