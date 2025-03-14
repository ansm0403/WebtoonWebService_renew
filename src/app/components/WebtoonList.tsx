'use client'

import React, { useEffect, useState } from 'react'
import { WebtoonListPage } from '../models/webtoonType'
import Card from './Card'
import Rank from './Rank'
import { usePagedRankWebtoons } from '../hook/webtoon'
import { webtoon } from '../models/webtoon'

interface WebtoonListProps {
    page? : string
    webtoons? : webtoon[];
    isRank? : boolean;
}

// const fetcher = (url : string) => fetch(url).then(res=>res.json());

function WebtoonList({
   page = '1',
   isRank = false,
   webtoons
} : WebtoonListProps
){

  // const [webtoons, setWebtoons] = useState<webtoon[]>();

  // useEffect(()=>{
  //   usePagedRankWebtoons(page).then(setWebtoons);
  // }, [page])

  // usePagedRankWebtoons().then(setWebtoons);

  console.log("data뭘봐 ㅋㅋ : ", webtoons);

  if(!webtoons){
    return(
      <div>웹툰 없음 ㅠㅠ</div>
    )
  }

  return (
    <div>
      <div className = "p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"> 
        {
          (webtoons as webtoon[]).map((webtoon, index)=>{
            return(
              <Card webtoon={webtoon} key = {webtoon.id}>
                {
                  isRank &&
                  <Rank rank={(index+1)+((parseInt(page)-1)*10)}/>
                }
              </Card>
            )
          })
        }    
      </div>
    </div>
  )
}

export default React.memo(WebtoonList);