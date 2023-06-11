import { NextFunction, Response, Request } from "express";
import { UsersService } from "../services/UsersService";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid';

class UsersController {

    //inicializando variavel
    private usersService: UsersService

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
    auth() {

    }

    //Alterar dados
    async update(request: Request, response: Response, next: NextFunction) {
        const { name, oldPassword, newPassword } = request.body;
        //testar o que estava passando
        console.log(request.file);
        try {
            //Bufer da imagem
            const avatar_url = request.file?.buffer;
            //Criando a conexao e envio do arquivo renomeando o mesmo
            const uploadS3 = await s3.upload({
                Bucket: 'hero-devgiovanni95',
                Key: `${uuid()}-${request.file?.originalname}`,
                //Nao temos permissão de acl
                // ACL: 'public-read',
                Body: avatar_url,
            })
                .promise();
            console.log('Url da imagem =>', uploadS3.Location);

            const result = await this.usersService.update({ 
                name, 
                oldPassword, 
                newPassword, 
                avatar_url: request.file, 
            });
            return response.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }
}


export { UsersController };