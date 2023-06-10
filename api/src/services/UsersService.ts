import { UsersRepository } from "../repositories/UsersRepository"
import { ICreate } from "../interfaces/UsersInterface";
import { hash } from "bcrypt";

class UsersService{
    //Criando a variavel
    private usersRepository: UsersRepository

    //Instanciando a variavel para que possamos a usar  no create
    constructor(){
        this.usersRepository = new UsersRepository(); 
    }
    async create({ name, email, password }: ICreate){

        const findUser = await this.usersRepository.findUserByEmail(email)

        //confere se ja existe um usuario com o email cadastrado
        if(findUser){
            //se exitir ele lança um erro e para a execução
            throw new Error('User exists')
        }

        //Encriptografar password
        const hashPassword = await hash(password, 10);//data e buffer


        //se nao existir ele cria um novo usuario
        const create = await this.usersRepository.create({
             name, 
             email, 
             password:hashPassword,
        });
        return create;
    }
}
 export{UsersService}