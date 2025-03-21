import Comments from '@/components/comment/Comments';
import Pagination from '@/components/Pagination';
import WebtoonDetail from '@/components/WebtoonDetail';
import { getPagedComment, getTotalComment } from '@/service/comment';
import { getWebtoon } from '@/service/webtoon';
import axios from 'axios';
import React from 'react'

export default async function WebtoonDetailPage({ 
    params : { id : webtoonId },
} : { 
    params : { id : string } 
}) {
    const webtoon = await getWebtoon(webtoonId); 

    return (
        <div className='flex flex-col justify-center rounded-xl p-20 mx-auto text-white mt-6 border-white border-2 max-w-[1084px]'>
            <WebtoonDetail webtoon = {webtoon}/>
            <Comments webtoonId={webtoon._id} />
        </div>
    )
}
