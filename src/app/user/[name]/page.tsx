import Comments from '@/components/comment/Comments'
import LikeWebtoonList from '@/components/my/LikeWebtoonList'
import Pagination from '@/components/Pagination'
import React from 'react'

export default function MyPage() {
  return (
    <div className='rounded-xl p-20 mx-auto text-white mt-6 border-white border-2 max-w-[1084px]'>
      <div className="w-full flex justify-center items-center flex-col">    
        <div className='text-[1.25rem] font-bold mt-5 mb-10'>좋아요 목록</div>
        
        <LikeWebtoonList />
        <hr className='my-20 w-[100%] mx-auto'></hr>
        <div className='text-[1.25rem] font-bold mt-5'>댓글 목록</div>
        
        <Comments type='author' isForm = {false} isBlack/>
      </div>
    </div>
  )
}

