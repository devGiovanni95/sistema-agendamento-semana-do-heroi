import style from './Register.module.css'
import logo from './../../assets/logo.webp'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import {Button} from "./../../components/Button"

export function Register(){
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
                     <h2>Olá, Seja Bem Vindo</h2>
                     <form >
                        < Input placeholder="E-mail" 
                         type="text"
                           //  {...register('email', {required: true})}
                            // error={errors.email && errors.email.message}    
                         />

                        < Input placeholder="Senha"
                        type="password"
                         //    {...register('password', {required: true})}
                         />
                         <Button text='Cadastrar'/>
                     </form>
                 </div>

             </div>
         </div>
     </div>
    )
}