'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({
  pathname,
  size = 10,
  totalData,
  pageGroupNum = 10,
} : {
  pathname? : string,
  size? : number,        // 페이지 하나에 들어있는 데이터 수
  totalData : number,
  pageGroupNum? : number // 페이지 그룹 1개 당 페이지 수 ex) 6이라면 1~6 다음 버튼을 누르면면 7~12 ...
}) {

  const navigate = useRouter()

  // 현재 페이지
  let nowPage = parseInt(useSearchParams().get('page') as string);
  if(!nowPage) nowPage = 1; 
  // 현재 페이지그룹. pageGroupNum == 10 이라면, 0~10은 0번째 그룹, 11~20은 1번째 그룹.
  const nowPageGroup = Math.ceil(nowPage / pageGroupNum) - 1;
  // 전체 페이지
  const totalPage = Math.ceil(totalData/size);  

  // 마지막 페이지 그룹
  // 마지막 페이지 그룹에서 다음 버튼을 비활성화 하기 위함.
  // size == 10 && pageGroupNum == 6 이다.. total == 626 이다..
  // totalPage == 63(total/size) , totalGroup == 11(totalPage/pageGroupNum)
  // lastGroup == 11 이다.
  const lastPageGroup = Math.ceil(totalPage / pageGroupNum)

  // 마지막 페이지 그룹의 첫 번째 페이지.
  const lastGroupFisrtPage = (lastPageGroup - 1) * pageGroupNum + 1;    

  const handlePrevOrNext = (direction : "prev" | "next") => {
    if( direction === "prev" ){
      navigate.push(`${pathname}?page=${(nowPageGroup - 1) * pageGroupNum + pageGroupNum}`);
    } else {
      navigate.push(`${pathname}?page=${(nowPageGroup + 1) * pageGroupNum + 1}`);
    }
  }

  return (
    <div className="flex items-center justify-center  gap-x-4 mb-12 text-white">
      { nowPage > pageGroupNum && (<button className='text-2xl' onClick={() => handlePrevOrNext("prev")}>{"<"}</button>) }
      {
        [...Array(size)].map((_, number)=>{
          const page = (Math.ceil(nowPage / pageGroupNum) - 1) * size + number + 1;
          if(page > totalPage) return;
          return(
            <Link 
              href = {`${pathname}?page=${page}`}
              key = {page} 
              className={`text-xl ${ page === nowPage ? "text-sky-400 text-4xl" : ""}`}
              >
              {page}
            </Link>
          )
        })
      }
      { nowPage < lastGroupFisrtPage && <button className='text-2xl' onClick={() => handlePrevOrNext("next")}>{">"}</button> }
    </div>
  )
}