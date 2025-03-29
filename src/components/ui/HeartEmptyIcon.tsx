import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";

export default function HeartEmptyIcon({
  onClick
} : {
  onClick : (() => void)
}) {
  return (
    <IoMdHeartEmpty onClick={onClick} className='absolute w-[2.25rem] top-1 right-1 cursor-pointer z-[30] text-3xl fill-red-500' />
  )
}
