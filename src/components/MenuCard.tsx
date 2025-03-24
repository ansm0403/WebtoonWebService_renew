import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MenuCard({
    zIndex,
    menu
} : {
    zIndex : number
    menu : { title : string, img : string, link : string }
  }) {
  return (
    <div className= {`relative flex justify-center items-center max-w-[1500px] min-w-[200px] h-[100vh] overflow-hidden z-[${zIndex}] `}>
        <Link href = {menu.link}>
          <Image
            className="opacity-30 hover:opacity-100 min-w-[100vh] max-w-[100vh]"
            alt = {menu.title} 
            src = {menu.img} 
            width = {1500} 
            height={2000} 
          />
        </Link>
        <div className='absolute text-white font-bold text-[3vh]'>{menu.title}</div>
    </div>
  )
}

