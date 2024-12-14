'use client'

import React, { createContext, useLayoutEffect, useState } from 'react'

export interface loginContextType {
    isLogin : boolean;
    setIsLogin : React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginContext = createContext<loginContextType>({
    isLogin : false,
    setIsLogin : ()=>{}
})


export default function LoginContextProvider({children} : {children : React.ReactNode}) {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const contextValue = {
        isLogin,
        setIsLogin,
    }

    useLayoutEffect(()=>{
        if(localStorage.getItem('login-Status'))
            setIsLogin(true);
    },[])

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}
