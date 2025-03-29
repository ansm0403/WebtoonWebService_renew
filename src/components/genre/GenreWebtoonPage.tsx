'use client'

import React from 'react'
import WebtoonList from '../WebtoonList'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface GenreListProps {
    page : string,
    genre : string 
}

export default function GenreWebtoonList({page, genre}: GenreListProps) {

    const params = { size : 10, page }
    const queryKey = [genre, page];

    const fetchGenreWebtoon = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/genre/${genre}`, { params })
        // : { webtoons, totalCount }
        return data;
    }   
    const { data, refetch, isLoading } = useQuery({
        queryKey : queryKey,
        queryFn : fetchGenreWebtoon
    })

    if(isLoading) return <WebtoonList.Skeleton />

    if( !data ) return null;

    return (
        <>
            <WebtoonList webtoons={data} refetch={refetch} isRank queryKey={queryKey}/>
        </>
    )
}
