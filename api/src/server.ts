import express, { Application, Request, Response, NextFunction } from 'express';
import { UsersRoutes } from './routes/users.routes';
import { SchedulesRoutes } from './routes/schedules.routes';
import cors from 'cors';

const app: Application = express();
//acessar via frontend
app.use(cors());
//Converter tudo em json
app.use(express.json());
//converter espaços nas urls e troca espaços por %
app.use(express.urlencoded({extended:true}));

//instanciado uma objeto para chamar funcoes de dentro do objeto e replicar essas informações
const usersRoutes = new UsersRoutes().getRoutes(); 
const schedulesRoutes = new SchedulesRoutes().getRoutes();
 

//funcionara como intermediador e passara sempre a rota de /users para simplificar na classe controller
app.use('/users',usersRoutes);
app.use('/schedules',schedulesRoutes);

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
