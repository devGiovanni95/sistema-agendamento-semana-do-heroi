import { useForm } from "react-hook-form";
import { Header } from "../../components/Header";
import { InputSchedule } from "../../components/InputSchedule";
import style from "./EditProfile.module.css";
import { IDataProfile, IFormValuesProfile } from "../../interfaces/InterfaceLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import imageDefault from '../../assets/do-utilizador_318-159711.avif'
import {FiEdit} from 'react-icons/fi'
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../../server";
import { useNavigate } from "react-router-dom";

export function EditProfile() {

    const schema = yup.object().shape({
        name: yup.string(),
        newPassword: yup.string(),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Senhas devem ser iguais.'),
    });

    const { register, handleSubmit, setValue } = useForm<IFormValuesProfile>({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const [fileUpload, setFileUpload] = useState(imageDefault);

    useEffect(() => {
        const userStorage = localStorage.getItem('user:semana-heroi');
        const user = userStorage && JSON.parse(userStorage);

        setValue('name', user.name);
        setValue('email', user.email);
        setValue('picture', user.avatar_url);

        //verificar
        if(user.avatar_url){
            setFileUpload(user.avatar_url)
        }
    }, []);


    const submit = handleSubmit(async ({name,password,newPassword,picture}:IFormValuesProfile) => {
        const data: IDataProfile = {
            name,
        }

        if(password && newPassword){
            data.oldPassword = password;
            data.newPassword = newPassword;
        }
        
        if(picture){
            data.avatar_url = picture[0];
        }

        try {
            const result = await api.put('/users', data, {
                headers: {
                    'Content-Type':'multpart/form-data',
                },
            })
            toast.success('Usuário atualizado com sucesso');
            navigate('/dashboard');

        } catch (error) {
            if(isAxiosError(error)){
                toast.error(error.response?.data.message);
            }
        }

    });

    const handleImage = (files: File[]) => {
        const image = files[0];

        const imageUrl = URL.createObjectURL(image);
        setFileUpload(imageUrl);
    }

    return (
        <div className="container">
            <Header />

            <div className={style.formDiv}>
                <form onSubmit={submit}>

                    {fileUpload && (
                        <div className={style.fileUpload}>
                            <img src={fileUpload} alt="" width={'200px'}/>
                            <label className={style.imageUpload}>
                            <input
                                type="file"
                                {...register('picture', { required: true, onChange: (e)=> handleImage(e.target.files) })}
                                />
                                <FiEdit/>        
                            </label>
                        </div>
                    )}

                    <InputSchedule
                        placeholder="Name"
                        type="text"
                        {...register('name', { required: true })}
                    />

                    <InputSchedule
                        placeholder="Email"
                        type="text"
                        {...register('email', { required: true })}
                    />

                    <InputSchedule
                        placeholder="Senha atual"
                        type="password"
                        {...register('password', { required: true })}
                    />

                    <InputSchedule
                        placeholder="Nova senha"
                        type="password"
                        {...register('newPassword', { required: true })}
                    />

                    <InputSchedule
                        placeholder="Confirmar nova senha"
                        type="password"
                        {...register('confirmPassword', { required: true })}
                    />


                    <div className={style.footer}>
                        <button>Cancelar</button>
                        <button>Editar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}