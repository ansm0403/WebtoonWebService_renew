'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import WebtoonList from '../WebtoonList';

export default function NewWebtoonList({ page } : { page : string }) {

    const params = { page, size : 10 }
    const queryKey = ["new", page];

    const fetchNewWebtoon = async () => {
        const { data }  = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/new`, {params});
        return data
    }


    const { data, refetch, isLoading } = useQuery({
        queryKey : queryKey,
        queryFn : fetchNewWebtoon
    }) 

    if(isLoading) return <WebtoonList.Skeleton />
    
  
    return (
        <WebtoonList webtoons={data} refetch={refetch} queryKey={queryKey}/>
    )
}
