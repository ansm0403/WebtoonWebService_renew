import React from 'react'
import Navigate from './Navigate'

type Props = {
    path : string;
    setModal : React.Dispatch<React.SetStateAction<boolean>>
}

export default function NotLoginNav({path, setModal} : Props) {
  return (
    <div className = 'flex flex-row gap-4'>
        <Navigate href= "/signup" disabled={path==='/signup' && true}>
            <div className = "p-4 border-solid border-2 border-indigo-600 rounded-lg hover:opacity-60 hover:text-white">
                Sign Up
            </div>
        </Navigate>
        <button 
            className = 'px-4 border-sky-300 border-2 rounded-lg hover:opacity-60 hover:text-white'
            onClick={()=>{setModal(true)}}
            >Sign In
        </button>
    </div>
  )
}
