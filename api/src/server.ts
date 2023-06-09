import express, { Application } from 'express'
import { UsersRoutes } from './routes/users.routes';

const app:Application = express();

//Converter tudo em json
app.use(express.json());
//converter espaços nas urls e troca espaços por %
app.use(express.urlencoded({extended:true}));

//instanciado uma objeto para chamar funcoes de dentro do objeto e replicar essas informações
const usersRoutes = new UsersRoutes().getRoutes() 

//funcionara como intermediador e passara sempre a rota de /users para simplificar na classe controller
app.use('/users',usersRoutes)

//Listando e definido serves
app.listen(3000, ()=>console.log('Server is running'))
