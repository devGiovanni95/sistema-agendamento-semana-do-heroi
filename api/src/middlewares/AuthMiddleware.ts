import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../interfaces/MiddlewaresInterface";


class AuthMiddleware{
    auth(request: Request, response: Response, next: NextFunction){
        const authHeader = request.headers.authorization;
        if(!authHeader){
             return response.status(401).json({
                code: 'token.missing',
                message: 'Token Missing',
             });
        }
        //Authorization: Bearer Token
        //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdpb3Zhbm5pMUBnbWFpbC5jb20iLCJpYXQiOjE2ODY0NTkyNTEsImV4cCI6MTY4NjQ2MDE1MSwic3ViIjoiYzc3Zjc5N2ItMTNmYi00YzJjLWJmMWItYmExYTg5ZTkyMzJlIn0.PprnuYpmWW3tqxuMOckbbSxwbf6twgRKXXcXeH89AEY
        //baerer 
        const[ , token ]  = authHeader.split(' ');

        let secretKey : string | undefined =  process.env.ACCESS_KEY_TOKEN;
        
        if(!secretKey){
            throw new Error("There is no token key ");
        }


        try {
            const { sub } = verify(token, secretKey) as IPayload ;
            request.user_id = sub;
            return next(); 
        } catch (error) {
            return response.status(401).json({
                code:'token.expired',
                message:'Token expired. ',
            });
            
        }
    }
}
export {AuthMiddleware};