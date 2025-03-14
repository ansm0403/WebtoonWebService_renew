import React from 'react'
import CloseButton from './ui/CloseButton'
import { webtoon } from '../models/webtoon'

export default function WebtoonInfoModal({
    children,
    webtoon : {title, url, thumbnailUrl, genre, likeCount, firstDate, dayOfWeek, platform},
    onClose
} : {
    children : React.ReactNode,
    webtoon : webtoon,
    onClose : () => void
}) {
  return (
    <div className = " bg-neutral-900/60 fixed top-0 left-0 w-full h-full">  
        <button className = 'fixed top-10 right-10' onClick = {()=>{onClose()}}>
                <CloseButton/>
        </button>
        {children}
    </div>
  )
}
