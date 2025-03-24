'use client'

import { ClientSafeProvider, signIn } from 'next-auth/react'
import React from 'react'

interface SigninProps{
  providers : Record<string,  ClientSafeProvider>
  callbackUrl : string
}

export default function SignIn({providers, callbackUrl} : SigninProps) {

  const providerNameBorder = (providerName : string) => {
    switch(providerName){
      case "Google" : return `bg-gradient-to-tr from-sky-300 via-blue-400`
      case "Naver" : return ``
      case "Kakao" : return ``
      default : return ``
    }
  }

  return (
    <>
      {Object.values(providers).map((provider)=>(
        <div className= {`flex justify-center mx-auto mt-[10rem] w-[18rem] sm:w-[24rem] rounded-md ${providerNameBorder(provider.name)}`} key={provider.name}>
          <button className = 'm-1 rounded-md bg-white w-[24rem] text-[1.25rem] h-[4rem] hover:opacity-40' onClick = {()=> signIn(provider.id, { callbackUrl })}>
             Sign in with <span className='font-bold text-sky-300'>{provider.name}</span>
          </button>
        </div>
      ))}
    </>
  )
}

