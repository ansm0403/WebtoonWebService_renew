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
                        <p>모달창 열렸슴니당!</p>
                        <WebtoonInfoModal webtoon={webtoon} onClose = {()=>setModal(false)}>
                                        {/* <div className = "w-[500px] h-[700px] m-auto gap-4 grid grid-rows-[repeat(8,minmax(0,1fr))] grid-cols-2 bg-white rounded-xl mt-6">
                                                <Image 
                                                    src = {`/images${thumnail}`} 
                                                    alt = {'modal image'}
                                                    width = {200}
                                                    height = {400}
                                                    className = "max-h-full max-w-full overfl row-start-1 row-end-5"
                                                ></Image>
                                                <p>제목 : {title}</p>
                                                <p>장르 : {genre}</p>
                                                <p>요일 : {dayOfWeek}</p>
                                                <p>플랫폼 : {platform}</p>
                                                <Link 
                                                    href = {url} 
                                                    className = "p-3 w-[30%] h-[50px] m-auto text-center text-neutral-50 rounded-lg bg-blue-500 col-start-1 col-end-3"
                                                >보러가기</Link>
                                                <CommentModal></CommentModal>      
                                        </div> */}
                        <InfoModalDetail webtoon={webtoon}></InfoModalDetail>
                        </WebtoonInfoModal> 
                    </ModalPortal>
                }
          </div>
  )
}
