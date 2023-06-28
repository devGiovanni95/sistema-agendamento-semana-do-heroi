import style from './Register.module.css'
import logo from './../../assets/logo.webp'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import {Button} from "./../../components/Button"
import * as yup from 'yup'
import { IFormValuesRegister } from '../../interfaces/InterfaceLogin'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {MdEmail} from 'react-icons/md';
import {IoMdPersonAdd} from 'react-icons/io';
import {RiLockPasswordFill} from 'react-icons/ri';
import { api } from '../../server'

export function Register(){
    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Campo de nome obrigatório'),
        email: yup
            .string()
            .email('Digite um email válido')
            .required('Campo de email obrigatório'),
        password: yup
            .string()
            .min(6,'Minimo de 6 caracteres')
            .required('Campo de senha obrigatório'),
    })
    const {
        register,
         handleSubmit, 
         formState:{errors}
    } = useForm<IFormValuesRegister>({resolver: yupResolver(schema)});

    const submit = handleSubmit(async(data) => {
    // console.log("🚀 ~ file: index.tsx:32 ~ submit ~ data:", data)
        const result = await api.post('/users', {
            name: data.name,
            email: data.email,
            password: data.password

        })
        console.log("🚀 ~ file: index.tsx:43 ~ submit ~ result:", result)
    })

    return(
        <div className={style.background}>
            <div className="container">
                <p className={style.navigate}>
                    <Link to={'/'}>
                        Home 
                    </Link>
                    {'>'} Área de Cadastro
                </p>
             <div className={style.wrapper}>
                 <div className={style.imageContainer}>
                     <img src={logo} alt="" />
                 </div>
                 <div className={style.card}>
                     <h2> Área de Cadastro</h2>
                     <form onSubmit={submit}>

                     < Input placeholder="Nome" 
                         type="text"
                            {...register('name', {required: true})}
                            error={errors.name && errors.name.message}    
                            icon={ <IoMdPersonAdd size={20}/>}   
                         />

                        < Input placeholder="E-mail" 
                         type="text"
                            {...register('email', {required: true})}
                            error={errors.email && errors.email.message} 
                            icon={ <MdEmail size={20}/>}   
                            />

                        < Input placeholder="Senha"
                        type="password"
                        {...register('password', {required: true})}
                        error={errors.password && errors.password.message}
                        icon={ <RiLockPasswordFill size={20}/>}   
                         />
                         <Button text='Cadastrar'/>
                     </form>
                     <div className={style.register}>
                            <span>
                                Já tem cadastro?  
                                <Link to={'/'}>
                                    Voltar a Página inicial
                                </Link>{' '}
                            </span>
                        </div>
                 </div>

             </div>
         </div>
     </div>
    )
}