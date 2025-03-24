
import React from 'react'
import GenreCircle from '@component/GenreCircle'
import GenreMainSwiper from '@/components/GenreMainSwiper'

export default function GenrePage() {
  return (
    // <GenreCircle></GenreCircle>
    <div className='flex items-center justify-center w-[100dvw] h-[100dvh]'>
      <GenreMainSwiper />
    </div>
  )
}
