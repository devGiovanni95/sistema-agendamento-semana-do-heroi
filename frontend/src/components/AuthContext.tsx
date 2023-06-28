import { createContext, useState } from "react";

export const AuthContext = createContext({})

export function AuthProvider({children}){
    const  [user, setUser] = useState('rian');
    return(
        /**Pegando de forma desestruturada {{user}} */
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}