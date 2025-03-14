import React from 'react'

export default function Rank({rank} : {rank : number}) {
  return (
    <div className = "absolute top-0 w-[2.25rem] h-6 bg-black text-white">
        {rank}
    </div>
  )
}
