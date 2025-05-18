import Link from 'next/link'
import React from 'react'

export default function Notfound() {
  return (
    <div className = "relative bottom-[131px] w-full h-full flex flex-col justify-center items-center text-center gap-5 text-white text-2xl">
        <div>입력하신 주소를 다시 확인해주세요.</div>
        <div className='text-[1rem]'>지금 입력하신 주소는 사라졌거나 다른 페이지로 변경되었습니다.</div>
        <Link 
            href = "/"
            className='text-slate-500 rounded-lg bg-slate-300 p-3 text-[1.4rem]'
        >
            홈으로
        </Link>
    </div>
  )
}
