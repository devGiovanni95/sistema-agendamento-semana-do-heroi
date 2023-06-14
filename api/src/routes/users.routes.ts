import { Router} from "express";
import { UsersController } from "../controllers/UsersController";
import { upload } from "../config/multer";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

//trabalhando com classes
class UsersRoutes{
    //inicializa uma variavel do router
    private router: Router;

    //inicializa uma variavel do tipo UserController criado em outra classe
    private usersController: UsersController;

    private authMiddleware:AuthMiddleware;

    //Pra chamar sempre o Router quando inicializar a classe com a variavel criada acima
    constructor(){
        this.router = Router();
        //instancia a classe pra sempre ser inicializada
        this.usersController = new UsersController();
        //Interceptar rotas para autenticacao
        this.authMiddleware = new AuthMiddleware();

    }

    //Recebe todos os metodos de router
    getRoutes(){
        this.router.post(
            '/', 
            this.usersController.store.bind(this.usersController),
        );

        this.router.put(
            '/', 
            upload.single('avatar_url'),
            this.authMiddleware.auth.bind(this.authMiddleware),
            this.usersController.update.bind(this.usersController),
        );

        this.router.post(
            '/auth',
            this.usersController.auth.bind(this.usersController),
        );

        return this.router;
    }
}

export {UsersRoutes}