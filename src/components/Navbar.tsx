'use client'

import React, { useState } from 'react'
import SearchIcon from '@component/ui/SearchIcon'
import Navigate from '@component/Navigate'
import NotLoginNav from '@component/NotLoginNav'
import LoginNav from '@component/LoginNav'
import { signIn, signOut, useSession } from 'next-auth/react'
import Avatar from '@component/auth/Avatar'
import Link from 'next/link'

export default function Navbar() {
  const { data : session } = useSession();
  const user = session?.user;


  return (
    <div className = "flex flex-row p-3 justify-between items-center">
            <Navigate href= "/">
              <h1 className = "text-3xl font-bold text-white ml-4"> WEBTOON </h1>
            </Navigate>        
        <nav className = "flex flex-row gap-4 mr-4  text-white">
            <Navigate href= "/search">
              <SearchIcon></SearchIcon>
            </Navigate>
            {
              user && (
                <Link href = {`/user/${user.username}`}>
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
    </div>
  )
}
