'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({
  pathname,
  limit = 10,
  totalCount,
  pageGroupNum = 10,
} : {
  pathname? : string,
  limit? : number,        // 페이지 하나에 들어있는 데이터 수
  totalCount : number,
  pageGroupNum? : number // 페이지 그룹 1개 당 페이지 수 ex) 6이라면 1~6 다음 버튼을 누르면면 7~12 ...
}) {

  const navigate = useRouter()

  // 현재 페이지
  let nowPage = parseInt(useSearchParams().get('page') as string);
  if(!nowPage) nowPage = 1; 
  // 현재 페이지그룹. pageGroupNum == 10 이라면, 0~10은 0번째 그룹, 11~20은 1번째 그룹.
  const nowPageGroup = Math.ceil(nowPage / pageGroupNum) - 1;
  // 전체 페이지
  const totalPage = Math.ceil(totalCount/limit);  

  // 마지막 페이지 그룹
  // 마지막 페이지 그룹에서 다음 버튼을 비활성화 하기 위함.
  // limit == 10 && pageGroupNum == 6 이다.. total == 626 이다..
  // totalPage == 63(total/limit) , totalGroup == 11(totalPage/pageGroupNum)
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
    <div className="flex items-center justify-center gap-x-4 pb-8 text-white">
      { nowPage > pageGroupNum && (
        <>
          <button className='text-2xl' onClick={() => handlePrevOrNext("prev")}>{"<"}</button>
          <Link className='text-xl' href = {`${pathname}?page=${1}`}>{1}</Link>
          <span>...</span>
        </>
      )}
      {
        [...Array(pageGroupNum)].map((_, number)=>{
          // page는 화면에 표시될 페이지 그룹의 페이지. 예를 들어 nowPage = 23 , pageGroupNum = 10 이라면
          // page는 21 ~ 30 사이의 수. 만약 전체 데이터가 321 이고, nowPage = 31 이라면
          // page는 31 ~ 33 사이의 수이다. 전체 데이터가 321 이기 때문에 마지막 페이지 그룹이 3이고,
          // 33 페이지에 마지막 데이터인 321번째 데이터가 표시 되기에 page가 34로 넘어갔을 때는 totalPage 보다 커지므로
          // 화면에 34 이후의 페이지는 표시 안함. 
          const page = (Math.ceil(nowPage / pageGroupNum) - 1) * pageGroupNum + number + 1;
          if(page > totalPage) return;
          return(
            <Link 
              href = {`${pathname}?page=${page}`}
              key = {page} 
              className={`text-xl ${ page === nowPage ? "text-sky-400 text-4xl" : ""}`}
              >
              { page }
            </Link>
          )
        })
      }
      { nowPage < lastGroupFisrtPage && (
          <>
            <span>...</span>
            <Link className='text-xl' href = {`${pathname}?page=${totalPage}`}>{totalPage}</Link>
            <button className='text-2xl' onClick={() => handlePrevOrNext("next")}>{">"}</button>
          </>
      ) }
    </div>
  )
}