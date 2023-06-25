export interface IInput{
    placeholder: string;
    type: 'password' | 'text' | 'date';
    error?: string;
}

export interface IFormValues{
    email: string;
    password:string;
}