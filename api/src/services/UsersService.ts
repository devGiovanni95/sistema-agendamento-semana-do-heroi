import { UsersRepository } from "../repositories/UsersRepository"
import { ICreate, IUpdate } from "../interfaces/UsersInterface";
import { compare, hash } from "bcrypt";
import { s3 } from "../config/aws";
import { v4 as uuid } from 'uuid';
import { sign, verify } from "jsonwebtoken";

class UsersService {
   /* auth() {
        throw new Error("Method not implemented.");
    }*/
    //Criando a variavel
    private usersRepository: UsersRepository

    //Instanciando a variavel para que possamos a usar  no create
    constructor() {
        this.usersRepository = new UsersRepository();
    }
    async create({ name, email, password }: ICreate) {

        const findUser = await this.usersRepository.findUserByEmail(email)

        //confere se ja existe um usuario com o email cadastrado
        if (findUser) {
            //se exitir ele lança um erro e para a execução
            throw new Error('User exists')
        }

        //Encriptografar password
        const hashPassword = await hash(password, 10);//data e buffer


        //se nao existir ele cria um novo usuario
        const create = await this.usersRepository.create({
            name,
            email,
            password: hashPassword,
        });
        return create;
    }

    async update({ name, oldPassword, newPassword, avatar_url, user_id }: IUpdate) {

        let password;
        if(oldPassword && newPassword){
            const findUserById = await this.usersRepository.findUserById(user_id);
            if(!findUserById){
                throw new Error('User not found');
            }
            const passwordMatch = compare(oldPassword, findUserById.password);

        if(!passwordMatch){
            throw new Error("Password invalid. ");
            }
            //criptografando a senha
            password = await hash(newPassword, 10);
           
            //alterando somente a senha
            await this.usersRepository.updatePassword(password, user_id);
        }
        
        if(avatar_url){

            
            //Bufer da imagem -- a interrogacao mostra que ele é opcional
            const uploadImage = avatar_url?.buffer;
            //Criando a conexao e envio do arquivo renomeando o mesmo
            const uploadS3 = await s3.upload({
            Bucket: 'hero-devgiovanni95',
            Key: `${uuid()}-${avatar_url?.originalname}`,
            Body: uploadImage,
        })
            .promise();
            
            console.log('Url da imagem =>', uploadS3.Location);

            //alterando o nome o endereco da imagem e o id do usuario
            await this.usersRepository.update(name, uploadS3.Location, user_id);
        }
            return{
                message: 'User updated successfully',
            };
        }

   async auth(email: string, password: string){
        const findUser = await this.usersRepository.findUserByEmail(email);
        if(!findUser){
            //mensagem generica para nao entregar uma informacao para um outro usuario 
            //causando na dimensas tentativas de acerto por terceiros
            throw new Error("User or Password invalid. ");
        }
        //comparar se o password está igual
        const passwordMatch = compare(password, findUser.password);
        
        if(!passwordMatch){
            throw new Error("User or Password invalid. ");
        }
        
        let secretKey:string | undefined =  process.env.ACCESS_KEY_TOKEN
        
        if(!secretKey){
            throw new Error("There is no token key ");

        }

        //gerando chave secreta
        const token = sign({email},secretKey ,{
            //o que vai no meio do token
            subject: findUser.id,
            //tempo de expiracao do token
            expiresIn: 60 * 15, 
        });

        return {
            token,
            user: {
                name: findUser.name,
                email: findUser.email,
            }
        }
    }

    async refresh(refresh_token: string) {
        if (!refresh_token) {
          throw new Error('Refresh token missing');
        }
        let secretKeyRefresh: string | undefined =
          process.env.ACCESS_KEY_TOKEN_REFRESH;
        if (!secretKeyRefresh) {
          throw new Error('There is no refresh token key');
        }
    
        let secretKey: string | undefined = process.env.ACCESS_KEY_TOKEN;
        if (!secretKey) {
          throw new Error('There is no refresh token key');
        }
        const verifyRefreshToken = verify(refresh_token, secretKeyRefresh);
    
        const { sub } = verifyRefreshToken;
    
        const newToken = sign({ sub }, secretKey, {
          expiresIn: '1h',
        });
        const refreshToken = sign({ sub }, secretKeyRefresh, {
          expiresIn: '7d',
        });
        return { token: newToken, refresh_token: refreshToken };
      }
    
}
export { UsersService };