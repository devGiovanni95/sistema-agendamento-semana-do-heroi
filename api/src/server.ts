import express, { Application, Request, Response, NextFunction } from 'express'
import { UsersRoutes } from './routes/users.routes';
import multer from 'multer';
import { upload } from './config/multer';

const app: Application = express();

//Converter tudo em json
app.use(express.json());
//converter espaços nas urls e troca espaços por %
app.use(express.urlencoded({extended:true}));

//instanciado uma objeto para chamar funcoes de dentro do objeto e replicar essas informações
const usersRoutes = new UsersRoutes().getRoutes() 

 

//funcionara como intermediador e passara sempre a rota de /users para simplificar na classe controller
app.use('/users',usersRoutes)

//tratamento de erros 
//throw new Error('error'); se tiver um deste ele executa este metodo
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            message: err.message,
        });
    }
    //erro de conexao
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    },
);

//Listando e definido serves
app.listen(3000, ()=>console.log('Server is running'))
