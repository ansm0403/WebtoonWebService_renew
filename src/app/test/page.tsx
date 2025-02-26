'use client'

import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { webtoons } from '../mock/webtoon'

export default function page() {

    const setWebtoon = async () => {
        const webtoon = await axios.post('/api/webtoon',  webtoons );
    }

    return (
        <div className='w-[200px] h-12 my-6 bg-slate-300 m-auto flex items-center justify-center '>
            <button onClick={()=>{setWebtoon()}}>
                웹툰 데이터 삽입
            </button>
        </div>
    )
}
