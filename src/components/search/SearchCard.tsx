'use client'

import React from 'react'
import { webtoon } from '@/models/webtoon'
import Link from 'next/link'

export default function SearchCard({webtoon} : { webtoon : webtoon }) {

    return (
        <Link 
            href = {`${process.env.NEXT_PUBLIC_SERVER_URL}/webtoon/${webtoon._id}`} 
            className = "flex flex-row items-center gap-3 mt-6 border-sky-200 border-[1px]  text-white px-4 py-2 rounded-md hover:scale-105" 
            key={webtoon.title}
        >
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src = {webtoon.thumbnailUrl} width = "70" height = "150" alt = "웹툰 썸네일" />
                </div>
                <div className='flex flex-col gap-2'>
                <div className='font-semibold'>제목 : {webtoon.title}</div>
                <div>요일 : {webtoon.dayOfWeek}</div>
                <div>장르 : {webtoon.genre}</div>
                </div>
                <button className='ml-auto text-2xl'>{">"}</button>
        </Link>
  )
}
