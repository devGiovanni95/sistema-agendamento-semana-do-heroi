import { createContext, useState } from "react";
import { IAuthContextData, IAuthProvider, ISignIn } from "../interfaces/InterfaceLogin";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({children}:IAuthProvider){
    async function signIn({email, password}: ISignIn){
            try {
                //const result = await api.post('/users/auth',{
                const {data} = await api.post('/users/auth',{
                    email,
                    password,
                });

                const {token, refresh_token,user} = data;
                const userData = {
                    name: user.name,
                    email: user.email,
                    avatar_url: user.avatar_url,
                };

                //localStorage.setItem("🚀 ~ file: AuthContext.tsx:15 ~ signIn ~ result:", result.data.token); 

                localStorage.setItem('token:semana-heroi', token);                
                localStorage.setItem('refresh_token:semana-heroi', refresh_token); 
                localStorage.setItem('user:semana-heroi',JSON.stringify(userData)); 
                return data;

            } catch (error) {
                console.log("🚀 ~ file: AuthContext.tsx:17 ~ signIn ~ error:", error)
                if(isAxiosError(error)){
                    toast.error(error.response?.data.message);
                }else{
                    toast.error('we were unable to login. Try later - Não conseguimos fazer o login. Tente mais tarde ')
                }
            }        
    }
    //const  [user, setUser] = useState('rian');
    return(
        /**Pegando de forma desestruturada {{user}} */
        <AuthContext.Provider value={{ signIn }}>
            {children}
        </AuthContext.Provider>
    )
}