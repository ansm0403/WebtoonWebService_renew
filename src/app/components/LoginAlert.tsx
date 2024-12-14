import React from 'react'

type Props = {
    onClose : () => void
}

export default function LoginAlert({onClose} : Props) {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-slate-400/10 z-[100]'>
        <div className = "fixed top-[40%] left-[40%] w-[300px] h-[150px] font-bold text-center m-auto bg-white rounded-md ">
            <div className=' text-red-700 my-8'>로그인이 필요합니다.</div>
            <button onClick = {onClose}>닫기</button>
        </div>
    </div>
  )
}
