import Comments from '@/components/comment/Comments'
import React from 'react'

export default function MyPage() {
  return (
    <div className='bg-white p-5 text-center w-[80dvw] rounded-xl mx-auto mt-[5rem] '>
      <div>likeWebtoon</div>
      <div>
        <Comments type='author' isForm = {false} />
      </div>
    </div>
  )
}
