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