'use client'

import React, { useState } from 'react'
import ModalPortal from '@component/ModalPortal'
import WebtoonInfoModal from '@component/WebtoonInfoModal'
import InfoModalDetail from '@component/InfoModalDetail'
import { webtoon } from '@/models/webtoon'

export default function SearchCard({webtoon} : { webtoon : webtoon }) {
  
    const [modal, setModal] = useState<boolean>(false)

    const handleModalState = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if( e.target === e.currentTarget ) setModal(false);
      setModal(true);
    }
  
    return (
        <div className = "flex flex-row items-center gap-3 mt-6 bg-white text-slate-800 px-4 py-2 rounded-md hover:scale-105" key={webtoon.title}>
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src = {webtoon.thumbnailUrl} width = "70" height = "150" alt = "웹툰 썸네일" />
                </div>
                <div className='flex flex-col gap-2'>
                <div className='font-semibold'>제목 : {webtoon.title}</div>
                <div>요일 : {webtoon.dayOfWeek}</div>
                <div>장르 : {webtoon.genre}</div>
                </div>
                <button className='ml-auto text-2xl' onClick={(e) => handleModalState(e)}>{">"}</button>
                {
                    modal && 
                    <ModalPortal>
                        <WebtoonInfoModal webtoon={webtoon} onClose = {()=>setModal(false)}>
                            <InfoModalDetail webtoon={webtoon}></InfoModalDetail>
                        </WebtoonInfoModal> 
                    </ModalPortal>
                }
          </div>
  )
}
