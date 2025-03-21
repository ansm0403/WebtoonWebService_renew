import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CommentModal from '@component/CommentModal'
import CommentList from '@component/CommentList'
import CommentContextProvider from '@context/CommentContextProvider'
import { webtoon } from '@/models/webtoon'

export default function InfoModalDetail({
    webtoon
} : {
    webtoon : webtoon
}) {
  
  const {_id, title, url, thumbnailUrl, genre, likeCount, firstDate, dayOfWeek, platform} = webtoon;

  return (
    <section className = "p-10 w-[500px] h-[700px] m-auto gap-4 grid grid-rows-[repeat(10,minmax(0,1fr))] grid-cols-2 bg-white rounded-xl mt-6">
            <img 
                src = {thumbnailUrl} 
                alt = {'modal image'}
                width = {200}
                height = {400}
                className = "max-h-full max-w-full overfl row-start-1 row-end-6"
            ></img>
            <p>제목 : {title}</p>
            <p>좋아요 : {likeCount}</p>
            <p>장르 : {genre}</p>
            <p>요일 : {dayOfWeek}</p>
            <p>플랫폼 : {platform}</p>
            <Link 
                href = {url} 
                target="_blank"
                className = "p-3 w-[30%] h-[50px] m-auto text-center text-neutral-50 rounded-lg bg-blue-500 col-start-1 col-end-3 hover:opacity-80"
            >보러가기</Link>
            <Link 
                href = {`/webtoon/${_id}`} 
                className = "p-3 w-[30%] h-[50px] m-auto text-center text-neutral-50 rounded-lg bg-blue-500 col-start-1 col-end-3 hover:opacity-80"
            >자세히</Link>
            <CommentContextProvider>
              <CommentModal webtoonId={_id}></CommentModal>
              <div className = 'p-2 row-start-[8] row-end-[11] col-start-1 col-end-3 border-[0.05rem] border-black rounded-sm overflow-hidden overflow-y-auto'>
                <CommentList webtoonId = {_id}></CommentList>  
              </div>   
            </CommentContextProvider>
    </section>
  )
}
