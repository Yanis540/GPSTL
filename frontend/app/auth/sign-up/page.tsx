/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from 'react';
import { SignUpSchema, useSignUp } from '../hooks/use-sign-up';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface PageProps {

};

function Page({ }: PageProps) {
    const { isLoading,signUp ,register,errors,control} = useSignUp();
    return (
        <div className="flex-1 flex  flex-col items-center justify-center">
            <form onSubmit={signUp.credentials}>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input {...register("firstName")} name="firstName" placeholder="Max" required />
                                    {errors.firstName && (<h6 className="text-sm font-sm text-red-500">{errors.firstName.message}</h6>)}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input  {...register("lastName")}id="lastName" placeholder="Robinson" required />
                                    {errors.lastName && (<h6 className="text-sm font-sm text-red-500">{errors.lastName.message}</h6>)}

                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email")}
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                    {errors.email && (<h6 className="text-sm font-sm text-red-500">{errors.email.message}</h6>)}

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input  {...register("password")} name="password" type="password" placeholder='*******' />
                                {errors.password && (<h6 className="text-sm font-sm text-red-500">{errors.password.message}</h6>)}

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input  {...register("confirmPassword")} name="confirmPassword" type="password" placeholder='*******' />
                                {errors.confirmPassword && (<h6 className="text-sm font-sm text-red-500">{errors.confirmPassword.message}</h6>)}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="birthDate">Birth Date</Label>

                                <DateSelector control={control} /> 
                            </div>
                           
                        </div>
                        <div className="grid gap-4 mt-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading?<Icons.spinner className="h-6 w-6 text-background" /> :"Create an account"}
                            </Button>
                           
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/sign-in" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};


import { Control, Controller } from 'react-hook-form'
import { Icons } from '@/components/icons';
function DateSelector ({control}:{control:Control<SignUpSchema>}){
    return (
        <Controller
            control={control}
            name='birthDate'
            render={({ field }) => (
            <Popover >
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        selected={(field.value as any)}
                        onSelect={(data)=>field.onChange(data)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        )}
        />
            
    )
}



export default Page;