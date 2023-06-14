//criando um tipo do express para utilizarmos na middleware
declare namespace Express{
    export interface Request{
        user_id:string;
    }
}