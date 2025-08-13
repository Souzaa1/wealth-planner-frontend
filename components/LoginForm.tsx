'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { setCookie } from "../lib/setCookie";
import { useRouter } from "next/navigation";
import { Mail, LockIcon, EyeOff, Eye, Loader, LogInIcon } from "lucide-react";
import Image from "next/image";

const loginSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {

    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(values: LoginFormValues) {
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:4000/api/v1/auth/login", values);
            setCookie("token", res.data.data.token, 7);
            router.push("/clientes");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro ao fazer login");
            } else {
                setError("Erro ao fazer login");
            }
        } finally {
            setLoading(false);
        }
    }

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
                        className='space-y-6'
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

                        {error && (
                            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

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

            <CardFooter className="w-full flex flex-col items-center">
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:text-blue-600  font-medium transition-colors"
                        >
                            Cadastre-se
                        </a>
                    </p>
                </div>
                <div className='pt-4 text-center text-xs text-muted-foreground'>
                    © {new Date().getFullYear()} ANKA -
                    Todos os direitos reservados
                </div>
            </CardFooter>
        </Card>

    );
}