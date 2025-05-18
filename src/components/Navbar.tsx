'use client'

import React, { useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const MobileNavbar = dynamic(()=>import('./MobileNavbar'), {});

const LoginNav = dynamic(()=>import('@component/LoginNav'), {});

const NotLoginNav = dynamic(()=>import('@component/NotLoginNav'), {});

const Avatar = dynamic(()=>import('@component/auth/Avatar'), {});

const HomeMenuButton = dynamic(()=>import('./ui/HomeMenuButton'), {});

const SearchIcon = dynamic(()=>import('@component/ui/SearchIcon'), {});


export default function Navbar() {
  const { data : session } = useSession();
  const user = session?.user;
  const [isOpen, setOpen] = useState(false);

  return (
    <div className = "bg-[rgb(31,41,55)] fixed top-0 right-0 left-0 flex flex-row p-3 justify-between items-center z-[99] w-full">
      <Link href = {"/"} className = "text-2xl lg:text-3xl font-bold text-white ml-4"> WEBTOON </Link>    
      <nav className = "flex flex-row mr-4 justify-center text-white">
        <div className="md:flex justify-center items-center gap-3 mr-5 hidden">
          <Link className = "hover:opacity-35" href = "/rank">전체순위</Link>
          <Link className = "hover:opacity-35" href = "/genre">장르순위</Link>
          <Link className = "hover:opacity-35" href = "/new">신작</Link>
          <Link href= "/search">
            <SearchIcon></SearchIcon>
          </Link>
        </div>
          <button 
            className='flex items-center md:hidden mr-5'
            onClick={() => setOpen((prev)=>!prev)}
          >
            <HomeMenuButton />
          </button>
          {
              user && (
                <Link className = "flex justify-center items-center mr-3" href = {`/user/${user.username}`}>
                  <Avatar image = {user.image}/>
                </Link>
              )
          }
          {
              session
              ? <LoginNav userName = {user?.name} onClick={() => signOut()}></LoginNav>
              : <NotLoginNav onClick={() => signIn()}></NotLoginNav>
          }
      </nav>
      {
        isOpen && (
          // <div className='flex flex-col h-[100dvh] fixed w-full bg-gray-800 gap-5 px-5 pt-5 text-white z-[60] top-[72px] left-0'>
          //   <Link className = "hover:text-gray-400" href={"/rank"} onClick={()=>setOpen(false)}>전체 순위</Link>
          //   <Link className = "hover:text-gray-400" href={"/genre"} onClick={()=>setOpen(false)}>장르 순위</Link>
          //   <Link className = "hover:text-gray-400" href={"/new"} onClick={()=>setOpen(false)}>신작 웹툰</Link>
          //   <Link className = "hover:text-gray-400" href={`/user/${user?.username}`} onClick={()=>setOpen(false)}>마이페이지</Link>
          //   <Link className = "hover:text-gray-400" href={"/search"} onClick={()=>setOpen(false)}>검색</Link>
          //   <button className = "hover:text-gray-400 mt-10" onClick={()=>setOpen(false)}>닫기</button>
          // </div>
          <MobileNavbar username = {user?.username} onClick={()=>setOpen(false)}/>
        )
      }
    </div>
  )
}
