import React from 'react'
import { IoMdHeart } from "react-icons/io";

export default function HeartIcon({
  onClick
} : {
  onClick? : (() => void)
}) {
  return (
    <IoMdHeart onClick = {onClick} className='absolute w-[2.25rem] top-1 right-1 cursor-pointer z-[30] text-3xl fill-red-500'/>
  )
}
