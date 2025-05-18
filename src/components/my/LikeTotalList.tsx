'use client'
import { LikeWebtoon, LikeWebtoonsResponse } from '@/models/webtoon';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react'
import SearchCard from '../search/SearchCard';

export default function LikeTotalList() {
  
    const { data : session } = useSession();
    const userId = session?.user.id;
    
    const fetchLikeWebtoons = async () => {
        const { data } = await axios.get(`/api/like`)

        return data;
    }

    const { data, isLoading } = useQuery({
        queryKey : ["like", userId],
        queryFn : fetchLikeWebtoons
    })

    if(!data) return null;
    
    const webtoons : LikeWebtoonsResponse = data[0];
    
    const likeWebtoons : LikeWebtoon[] = webtoons.likeWebtoons

    return (
        <div className='w-full'>
            {
                likeWebtoons.map((likeWebtoon)=>(
                    <SearchCard key = {likeWebtoon._id} webtoon={likeWebtoon}/>
                ))
            }
        </div>
    )
}
