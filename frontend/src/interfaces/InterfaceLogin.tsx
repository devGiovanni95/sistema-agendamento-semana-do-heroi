import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactNode } from "react";

export interface IInput{
    placeholder: string;
    type: 'password' | 'text' | 'date';
    error?: string;
    icon?: ReactNode;
}

export interface IFormValuesLogin{
    email: string;
    password: string;
}

export interface IFormValuesRegister{
    name: string;
    email: string;
    password: string;
}

export interface IButton{
    text: string;
}

export interface IAuthProvider{
    children: ReactNode;
}

export interface IAuthContextData{
    signIn:({ email, password}: ISignIn) => void;
    signOut: () => void;
}

export interface ISignIn{
    email: string;
    password: string;
}

export interface IRequestConfig extends AxiosRequestConfig{
    onFailure?: (error: AxiosError) => void;
    onSuccess?: (response: AxiosResponse) => void;
}
