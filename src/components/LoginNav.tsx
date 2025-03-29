'use client'

import React,{MouseEvent, useContext} from 'react'
// import { LoginContext } from '@context/LoginContextProvider';
import { useRouter } from 'next/navigation';

interface LogoutProps {
    onClick : () => void;
    userName? : string | null
}

export default function LoginNav({onClick, userName} : LogoutProps) {
    
    return (
        <>
        <div className = 'flex flex-row gap-4 items-center ml-1 mr-3'>
            {
                userName && <p className = ' text-white  hidden md:inline'><span className = 'text-purple-500 font-bold pr-1 '>{userName }</span>님 </p>
            }
        </div>
        <div className = 'flex flex-row gap-4'>
        <button 
            className = 'px-4 border-purple-400 border-2 rounded-lg hover:opacity-60 hover:text-white'
            onClick={() => onClick()}
        >Sign Out</button>
    </div>
        </>
    )
}
