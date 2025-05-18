import React from 'react'

type Props = {
    onClick : () => void
}

export default function NotLoginNav({onClick} : Props) {
  return (
    <div className = 'flex flex-row gap-4'>
        <button 
            className = 'px-4 py-3 border-sky-300 border-2 rounded-lg hover:opacity-60 hover:text-white'
            onClick={()=>{onClick()}}
            >Sign In
        </button>
    </div>
  )
}
