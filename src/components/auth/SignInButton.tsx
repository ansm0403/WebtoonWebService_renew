import { ClientSafeProvider, signIn } from 'next-auth/react'
import React from 'react'

interface SigninButtonProps{
  provider : ClientSafeProvider
}

export default function SignInButton({
    provider
} : SigninButtonProps
) {
  return (
    <div className='flex justify-center mx-auto mt-[10rem] w-[24rem] bg-gradient-to-tr from-sky-300 via-blue-400 rounded-md' key={provider.name}>
        <button className = 'm-1 rounded-md bg-white w-[24rem] text-[1.25rem] h-[4rem] hover:opacity-40' onClick = {()=> signIn(provider.id)}>
            Sign in with <span className='font-bold text-sky-300'>{provider.name}</span>
        </button>
    </div>
  )
}
