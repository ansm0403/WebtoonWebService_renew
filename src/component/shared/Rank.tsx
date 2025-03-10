import React from 'react'

export default function Rank({rank} : {rank : number}) {
  return (
    <div className = "absolute top-0 w-5 h-5 bg-black text-white">
        {rank}
    </div>
  )
}
