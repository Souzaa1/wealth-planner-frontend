'use client';

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { setCookie } from "../lib/setCookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckIcon, Eye, EyeOff, Loader, LockIcon, LogInIcon, Mail, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres" }),
}).refine(
    (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
    {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    }
);

type RegisterFormValues = z.infer<typeof registerSchema>;

const requirements = [
    { regex: /.{6,}/, text: 'Pelo menos 6 caracteres' },
    { regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
    { regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
    { regex: /[0-9]/, text: 'Pelo menos 1 número' },
    {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
        text: 'Pelo menos 1 caractere especial'
    }
]

export default function RegisterForm() {

    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: RegisterFormValues) {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:4000/api/v1/auth/register", values);
            setCookie("token", res.data.token, 7);
            setSuccess("Cadastro realizado com sucesso!");
            router.push("/login");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro ao registrar");
            } else {
                setError("Erro ao registrar");
            }
        } finally {
            setLoading(false);
        }
    };

    const strength = requirements.map(req => ({
        met: req.regex.test(form.watch("password")),
        text: req.text
    }));

    const strengthScore = useMemo(() => {
        return strength.filter(req => req.met).length
    }, [strength]);

    const getColor = (score: number) => {
        if (score === 0) return 'bg-border'
        if (score <= 1) return 'bg-destructive'
        if (score <= 2) return 'bg-orange-500 '
        if (score <= 3) return 'bg-amber-500'
        if (score === 4) return 'bg-yellow-400'

        return 'bg-emerald-500'
    };

    const getText = (score: number) => {
        if (score === 0) return 'Digite uma senha'
        if (score <= 2) return 'Senha fraca'
        if (score <= 3) return 'Senha média'
        if (score === 4) return 'Senha forte'

        return 'Senha muito forte'
    };



    return (
        <Card className='relative z-10 h-auto w-full max-w-[380px] overflow-hidden border-0 bg-card/90 shadow-2xl backdrop-blur-sm'>
            <div className='animate-rgb absolute top-0 h-2 w-full rounded-t-lg bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_100%]'></div>


            <CardHeader className='pt-8'>
                <CardTitle className='flex flex-col items-center gap-2 text-center text-2xl font-bold'>
                    <div className='relative inline-flex items-center justify-center border border-orange-700 w-32 h-16 rounded-3xl bg-gradient-to-br from-[#F9151569] to-[#D3A23721] mb-4 shadow-lg'>
                        <Image
                            src='/logo.png'
                            alt='Logo'
                            width={90}
                            height={90}
                            quality={100}
                        />
                    </div>
                    <h2 className='text-2xl text-foreground'>
                        Bem-vindo
                    </h2>
                    <p className='text-sm font-normal text-muted-foreground'>
                        Entre com suas credenciais para continuar
                    </p>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-foreground'>
                                        E-mail
                                    </FormLabel>
                                    <FormControl>
                                        <div className='relative'>
                                            <div className='absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground'>
                                                <Mail size={16} />
                                            </div>
                                            <Input
                                                id='user'
                                                type='text'
                                                placeholder='Digite seu ID de usuário'
                                                {...field}
                                                className='border-muted bg-muted/40 pl-8 focus-visible:ring-secondary'
                                            />

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm font-medium text-foreground'>
                                            Senha
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <div className='absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground'>
                                                    <LockIcon size={16} />
                                                </div>
                                                <Input
                                                    id='password'
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder='Digite sua senha'
                                                    {...field}
                                                    className='border-muted bg-muted/40 pl-8 focus-visible:ring-secondary'
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='icon'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent'
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className='size-4' />
                                                    ) : (
                                                        <Eye className='size-4' />
                                                    )}
                                                    <span className='sr-only'>
                                                        {showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'}
                                                    </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='space-y-2'>
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm font-medium text-foreground'>
                                            Confirmação de Senha
                                        </FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <div className='absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground'>
                                                    <LockIcon size={16} />
                                                </div>
                                                <Input
                                                    id='confirm-password'
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder='Digite sua confirmação de senha'
                                                    {...field}
                                                    className='border-muted bg-muted/40 pl-8 focus-visible:ring-secondary'
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='icon'
                                                    className='absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:bg-transparent'
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className='size-4' />
                                                    ) : (
                                                        <Eye className='size-4' />
                                                    )}
                                                    <span className='sr-only'>
                                                        {showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'}
                                                    </span>
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='mb-4 flex h-1 w-full gap-1'>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span
                                    key={index}
                                    className={cn(
                                        'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                                        index < strengthScore ? getColor(strengthScore) : 'bg-border'
                                    )}
                                />
                            ))}
                        </div>

                        <p className='text-foreground text-sm font-medium'>{getText(strengthScore)}. Deve conter:</p>

                        <ul className='mb-4 space-y-1.5'>
                            {strength.map((req, index) => (
                                <li key={index} className='flex items-center gap-2'>
                                    {req.met ? (
                                        <CheckIcon className='size-4 text-emerald-600 dark:text-emerald-400' />
                                    ) : (
                                        <XIcon className='text-muted-foreground size-4' />
                                    )}
                                    <span className={cn('text-xs', req.met ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')}>
                                        {req.text}
                                        <span className='sr-only'>{req.met ? ' - Requirement met' : ' - Requirement not met'}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>



                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {success && <div className="text-emerald-600 text-sm">{success}</div>}

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex items-center gap-2 text-white'>
                                    <Loader className='size-4 animate-spin' />
                                    <span>Autenticando...</span>
                                </div>
                            ) : (
                                <div className='flex items-center gap-2 text-white'>
                                    <LogInIcon className='size-4' />
                                    <span>Entrar</span>
                                </div>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
