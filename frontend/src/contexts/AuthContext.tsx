import { createContext, useState } from "react";
import { IAuthContextData, IAuthProvider, ISignIn } from "../interfaces/InterfaceLogin";
import { api } from "../server";

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({children}:IAuthProvider){
    async function signIn({email, password}: ISignIn){
            try {
                const result = await api.post('/users/auth',{
                    email,
                    password,
                });
                console.log("🚀 ~ file: AuthContext.tsx:15 ~ signIn ~ result:", result);                
            } catch (error) {
                console.log("🚀 ~ file: AuthContext.tsx:17 ~ signIn ~ error:", error)
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