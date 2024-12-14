'use client'
import React, { createContext, useState } from 'react'

export interface commentContextType{
    isChange : boolean,
    setIsChange : React.Dispatch<React.SetStateAction<boolean>>
}
export const CommentContext = createContext<commentContextType>({
    isChange : false,
    setIsChange : ()=>{}
});

export default function CommentContextProvider({children} : {children : React.ReactNode}) {
    const [isChange, setIsChange] = useState<boolean>(false);
    return (
        <CommentContext.Provider value={{isChange, setIsChange}}>
            {children}
        </CommentContext.Provider>
    )
}
