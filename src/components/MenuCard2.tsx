'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { MouseEvent } from 'react'

export default function MenuCard2({
    menu,
    menuIndex
} : {
    menu : { title : string, img : string[], link : string },
    menuIndex : number
}){
    const [ hoverIndex, setHoverIndex ] = useState<number | null>(null);

    

    const getMenuStyles = (index : number) => {
        return (`
            ${index !== 1 ? "absolute" : ""}
            flex  justify-center items-center 
            max-w-[1500px] min-w-[200px] h-[100dvh] 
            overflow-hidden 
            transition-transform
            ${menuIndex !== index ? "translate-y-[100vh]" : ""}
        `)
    }

    // ${(menuIndex !== index) ? "hidden" : ""}

    const handleMenuEnter = (e:MouseEvent<HTMLDivElement>) => {
        setHoverIndex(parseInt(e.currentTarget.dataset.index as string));
    }

    const handleMenuleave = (e:MouseEvent<HTMLDivElement>) => {
        setHoverIndex(null);
    }

    return (
        <div className='relative'>
        {
          menu.img.map((img, index)=>{
            const menuTitle = menu.title.split(" ")[0]
            return (
              <div 
                key = {img}
                data-index = {index} 
                className= {getMenuStyles(index)}
                onMouseEnter={e => handleMenuEnter(e)}
                onMouseLeave={e => handleMenuleave(e)}
              >
                <Link href = {menu.link} className='' >
                  <Image
                    className={`top-[0px] left-[0] md:top-[100px] opacity-30 hover:opacity-100 transition-opacity  min-w-[100dvh] w-[100dvw]`}
                    alt = {menu.title} 
                    src = {img}
                    width = {1500} 
                    height={2000} 
                  />
                </Link>
                <div className='absolute text-white font-bold text-[3dvh]'>{menu.title}</div>
            </div>
            )
          })
        }
       
        </div>
      )
}
