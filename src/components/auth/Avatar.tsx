import { useQuery } from '@tanstack/react-query';
import { getProviders } from 'next-auth/react';
import React from 'react'

export default function Avatar({ image } : { image? : string | null }) {


    return (
        <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-purple-300 via-purple-900'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className = 'rounded-full p-[0.1rem]' alt = "유저 프로필" src = {image ?? undefined} referrerPolicy='no-referrer'/>
        </div>
    )
}
