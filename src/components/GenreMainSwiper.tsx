'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { genreThumbnails } from '@/mock/genreCircle';
import Link from 'next/link';

export default function GenreMainSwiper() {

    const [weight, setWeight] = useState<number>(0);

    // let weight = 0;

    const handleGenreSwiper = (direction : string) => {
        if(direction === "left"){
            setWeight(prev => {
                return (prev - 1) % 7;
            })
            // weight = (weight - 1) % 7
        }
        if(direction === "right"){
            setWeight(prev => {
                return (prev + 1) % 7;
            })
            // weight = (weight + 1) % 7
        }
    }
    // 6 + 1 7  

  return (
    <div className='w-full relative top-[-27rem] md:top-[-25rem] flex justify-center items-center flex-row transition-all' style = {thumbnailContainerStyle}>
        {
            genreThumbnails.map((data, index)=>{
                return (
                <React.Fragment key = {genreThumbnails[index].link}>
                    <Link 
                        className={`absolute w-[9rem]  md:w-[13rem] hover:text-black text-center transition-all hover:scale-125 ${Math.abs((index + weight) % 7)*51 === 0 ? "" : "pointer-events-none"}`} 
                        href = {data.link}
                    >
                        <Image 
                            className='pt-[500px] w-[50vw] opacity-40 hover:opacity-100 transition-opacity'
                            src = {`/images/${data.thumbnail}`} 
                            alt = "장르 메인 페이지" 
                            width = {300} 
                            height={500}
                            style={{
                                transform : `
                                    perspective(1200px)
                                    rotateY(${(index + weight)*51.43}deg)
                                    translateZ(500px) 
                                `
                            }}
                        />
                        <div 
                            className=' text-center text-xl font-bold opacity-100 text-white' 
                            style={{
                                    transform : `
                                        perspective(1200px)
                                        rotateY(${(index + weight)*51.43}deg)
                                        translateZ(500px) 
                                    `
                            }}
                         >{Math.abs((index + weight) % 7)*51 === 0 ? data.genre : ""}</div>
                    </Link>  
                </React.Fragment>
            )})
        }
        <button 
            className={`${slideButtonStyle} left-[3%] md:left-[20%] `}
            onClick={()=>handleGenreSwiper("left")}
        >{"<"}
        </button>
        <button 
            className={`${slideButtonStyle} right-[3%] md:right-[20%] `}
            onClick={()=>handleGenreSwiper("right")}
        >{">"}
        </button>
    </div>
  )
}

const thumbnailContainerStyle = {
    transform : `
        perspective(1200px)
        rotateX(0deg)    
    `
}

const slideButtonStyle = `
    fixed
    top-[20rem]
    text-white
    text-[7rem]
    md:text-[8rem] 
    md:opacity-40
    hover:text-[10rem]
    hover:opacity-100
    z-50
`