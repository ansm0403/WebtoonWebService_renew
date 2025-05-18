'use client'

import React, { memo } from 'react'
import WebtoonList from '../WebtoonList'
import { webtoon } from '@/models/webtoon'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function RankWebtoonList({ page } : { page : string }) {

    const queryKey = ["rank", page]
    const fetchRankPageWebtoons = async () => {
        const params = { page, size : 10 }
        const { data } = await axios.get<webtoon[]>(`/api/rank`, { params })
        return data
    }
    
    const { data : webtoons, refetch, isLoading } = useQuery({
      queryKey : queryKey,
      queryFn : fetchRankPageWebtoons
    })

    if(isLoading) return (
      <WebtoonList.Skeleton />
    )

    if(!webtoons) return null;

    return (
        <WebtoonList webtoons = {webtoons} page = {page} isRank refetch={refetch} queryKey={queryKey}/>
    )
}

export default memo(RankWebtoonList);