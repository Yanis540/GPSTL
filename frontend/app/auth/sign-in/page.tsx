'use client'
import React from 'react';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useSignIn } from '../hooks/use-sign-in';
  
  
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PageProps {

};

function Page({}:PageProps) {
    const {signIn,register,errors} = useSignIn(); 
    return (
    <div className="flex-1 flex  flex-col items-center justify-center">
        <form onSubmit={signIn.credentials}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...register("email")}
                            name="email"
                            placeholder="m@example.com"
                            required
                        />
                        {errors.email && (<h6 className="text-sm font-sm text-red-500">{errors.email.message}</h6>)}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                            </Link>
                            {errors.password && (<h6 className="text-sm font-sm text-red-500">{errors.password.message}</h6>)}
                        </div>
                        <Input {...register("password")} name="password" type="password" placeholder='******'required />
                    </div>
                    <Button type="submit" className="w-full">
                    Login
                    </Button>
                    <Button variant="outline" className="w-full">
                    Login with Google
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/sign-up" className="underline">
                    Sign up
                    </Link>
                </div>
                </CardContent>
            </Card>
        </form>
    </div>
    );
};




export default Page;