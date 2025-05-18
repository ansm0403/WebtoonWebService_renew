import { OAuthUser } from '@/models/user';
import Link from 'next/link'
import React from 'react'

interface MobileNavbarProps {
    onClick : () => void;
    username : string | undefined
}

export default function MobileNavbar({onClick, username} : MobileNavbarProps) {
  return (
    <div className='flex flex-col h-[100dvh] fixed w-full bg-gray-800 gap-5 px-5 pt-5 text-white z-[60] top-[72px] left-0'>
            <Link className = "hover:text-gray-400" href={"/rank"} onClick={onClick}>전체 순위</Link>
            <Link className = "hover:text-gray-400" href={"/genre"} onClick={onClick}>장르 순위</Link>
            <Link className = "hover:text-gray-400" href={"/new"} onClick={onClick}>신작 웹툰</Link>
            {
              username && (
                <Link className = "hover:text-gray-400" href={`/user/${username}`} onClick={onClick}>마이페이지</Link>
              )
            }
            <Link className = "hover:text-gray-400" href={"/search"} onClick={onClick}>검색</Link>
            <button className = "hover:text-gray-400 mt-10" onClick={onClick}>닫기</button>
    </div>
  )
}
