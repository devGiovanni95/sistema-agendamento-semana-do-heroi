import React from "react";
import { Navigate } from "react-router-dom";
import {IPrivateRoute} from '../interfaces/InterfaceLogin'
import { useAuth } from "../hooks/auth";

const PrivateRoute: React.FC<IPrivateRoute> = ({children}) => {

    const {isAuthenticated} = useAuth();

    if(!isAuthenticated){
        return<Navigate to={'/'} />;
    }
    return<>{children}</>
}

export {PrivateRoute}