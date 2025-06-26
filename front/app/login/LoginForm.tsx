'use client'
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from 'react-icons/ai';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";

interface LoginFormProps{
    currentUser: SafeUser | null
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if(currentUser){
            router.push('/cart');
            router.refresh();
        }
    },[])

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                    router.push("/cart");
                    router.refresh();
                    toast.success('Logado com sucesso!');
                }
                if(callback?.error){
                    toast.error(callback.error)
                }
        })
    };

    if(currentUser){
        return <p className="text-center">Você já está logado! Redirecionando...</p>
    }

    return(
        <>
            <Heading title="Sign in to KLP Shop"/>
            <Button outline label="Continue with Google" icon={AiOutlineGoogle} onClick={() => {}}/>
            <hr className="bg-slate-300 w-full h-px" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
            <Input id="password" label="Senha" disabled={isLoading} register={register} errors={errors} required type="password"/>
            <Button label={isLoading ? "Carregando" : "Login"} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">Não tem uma conta? 
                <Link className="underline" href='/register'> Registre-se</Link>
            </p>
        </>
    );
};

export default LoginForm;