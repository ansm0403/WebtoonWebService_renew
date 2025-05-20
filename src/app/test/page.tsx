'use client'

import React from 'react'
import { webtoons } from '@mock/webtoon'
import { addWebtoon, deleteWebtoon } from '@service/webtoon';

export default function page() {

    // const setWebtoon = async () => {
    //     for( let webtoon of webtoons ){
    //         await addWebtoon(webtoon);
    //     }
    // }

    // const handleDeleteWebtoon = async () => {
    //     for(let webtoon of webtoons){
    //         await deleteWebtoon(webtoon);
    //     }
    // }

    // return (
    //     <div className='w-[200px] m-auto flex flex-col items-center justify-center gap-4'>
    //         <button className='h-12 w-40 bg-slate-400' onClick={()=>{setWebtoon()}}>
    //             웹툰 데이터 삽입
    //         </button>
    //         <button className='h-12 w-40 bg-slate-400' onClick={()=>{handleDeleteWebtoon()}}>
    //             웹툰 데이터 삭제
    //         </button>
    //     </div>
    // )
}
