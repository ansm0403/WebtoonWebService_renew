'use client'
import React, { useRef, useState } from 'react'
import '@/app/globals.css'
import Image from 'next/image'
import ModalPortal from '@component/ModalPortal'
import WebtoonInfoModal from '@component/WebtoonInfoModal'
import { TempWebtoon, Webtoon } from '@models/webtoonType'
import InfoModalDetail from '@component/InfoModalDetail'
import CommentModal from '@component/CommentModal'
import { webtoon } from '@models/webtoon'
import Link from 'next/link'

type Props = {
    webtoon : webtoon,
    children : React.ReactNode
}

export default function Card({webtoon, children} : Props ) {
    const {title, url, thumbnailUrl, genre, likeCount, firstDate, dayOfWeek, platform} = webtoon;
    const [modal, setModal] = useState<boolean>(false)
    // const loadingRef = useRef<HTMLDivElement>(null)  

    return (
        <div className = 'relative border-2 text-center rounded-md border-none overflow-hidden hover:scale-90 transition-transform'>
            <Link href = {`${process.env.NEXT_PUBLIC_SERVER_URL}/webtoon/${webtoon._id}`} className = 'relative mx-auto min-w-[200px] max-w-[250px] h-[300px]'>
                <img 
                    className = "border-none border-2 rounded-xl cursor-pointer" 
                    src = {`${thumbnailUrl}`} 
                    alt = 'card image' 
                    // fill = {true}
                    // onLoadingComplete={()=>{loadingRef.current?.remove()}}    이미지 로딩 애니메이션
                    onClick={(event)=>{
                        if(event.target === event.currentTarget) setModal(false);
                        setModal(true)
                    }}
                ></img>
                {/* <div className = 'imageLoading' ref={loadingRef}></div> */}
            </Link>
            <p className = 'mt-2  text-stone-400'>{title}</p>
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
            {children}
        </div>
    )
}
