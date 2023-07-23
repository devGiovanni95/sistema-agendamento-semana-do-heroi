import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ReactNode } from "react";

export interface IInput {
    placeholder: string;
    type: 'password' | 'text' | 'date';
    error?: string;
    icon?: ReactNode;
}

export interface IFormValuesLogin {
    email: string;
    password: string;
}

export interface IFormValuesRegister {
    name: string;
    email: string;
    password: string;
}

export interface IButton {
    text: string;
}

export interface IAuthProvider {
    children: ReactNode;
}

export interface IAuthContextData {
    signIn: ({ email, password }: ISignIn) => void;
    signOut: () => void;
    user: IUserData;
    availableSchedules: Array<string>;
    schedules: Array<ISchedules>;
    date: string;
    handleSetDate: (date: string) => void;
    isAuthenticated: boolean;
}

export interface ISignIn {
    email: string;
    password: string;
}

export interface IRequestConfig extends AxiosRequestConfig {
    onFailure?: (error: AxiosError) => void;
    onSuccess?: (response: AxiosResponse) => void;
}

export interface IUserData {
    name: string;
    avatar_url: string;
}

export interface ISchedules {
    name: string;
    phone: string;
    date: Date;
    id: string;
}

export interface IModal {
    isOpen: boolean;
    handleChangeModal: () => void;
    hour: string;
    name: string;
    id: string;
}

export interface IPrivateRoute {
    children: ReactNode;
}

export interface IFormValuesProfile {
    picture: File[];
    name: string;
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export interface IDataProfile {
    newPassword?: string;
    oldPassword?: string;
    name?: string;
    avatar_url?: File;

}