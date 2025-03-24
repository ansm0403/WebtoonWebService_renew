'use client'
import { LikeWebtoon, LikeWebtoonsResponse } from '@/models/webtoon';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination';
import { useSearchParams } from 'next/navigation';

export default function LikeWebtoonList() {
    const { data : session } = useSession();
    const userId = session?.user.id;
    const limit = 3

    const page = useSearchParams().get("page") ?? "1"

    const fetchLikeWebtoons = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/like`)

        return data;
    }

    const { data, isLoading } = useQuery({
        queryKey : ["like", userId],
        queryFn : fetchLikeWebtoons
    })

    if(isLoading) return (
        <div className="flex justify-center items-center h-[300px] ">
            <FadeLoader />
        </div>
    )

    if(!data) return null;

    const webtoons : LikeWebtoonsResponse = data[0];

    const likeWebtoons : LikeWebtoon[] = webtoons.likeWebtoons
    const sliceIndex = webtoons.totalCount < limit ? webtoons.totalCount : limit;

    return (
        <>
            <div className='flex flex-col md:flex-row items-center justify-center'>
                {
                    likeWebtoons.slice(0, sliceIndex).map((likeWebtoon)=>(
                        <Link href={`/webtoon/${likeWebtoon._id}`} className='border-[1.5px] border-gray rounded-xl mb-10 mx-5'>
                            <img className = "rounded-xl" src = {likeWebtoon.thumbnailUrl} width = {250} />
                            <div className='p-5 font-bold text-center text-[1.05rem]'>{likeWebtoon.title}</div>
                        </Link>
                    ))
                }  
            </div>
            <Link href = {`/user/${session?.user.username}/likes`} className='w-[60%] p-3 rounded-lg mb-5 text-center bg-sky-400 text-white font-bold'>
                좋아요 전체 목록 보기
            </Link>
        </>
    )
}
