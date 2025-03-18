import { authOptions } from '@/auth/authOptions';
import SignIn from '@/components/auth/SignIn';
import { getServerSession } from 'next-auth'
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

interface SignInProps{
    searchParams : { [key : string] : string | undefined }
}

export default async function SignInPage({searchParams : { callbackUrl }} : SignInProps) {

    const session = await getServerSession(authOptions);

    if(session){
        redirect('/');
    }

    const providers = (await getProviders()) ?? {};

    return (
        <section>
            <SignIn providers={providers} callbackUrl = {callbackUrl ?? "/"}/>
        </section>
    )
}
