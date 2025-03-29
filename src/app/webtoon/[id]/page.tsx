import Comments from '@/components/comment/Comments';
import WebtoonDetail from '@/components/WebtoonDetail';
import React from 'react'

export default async function WebtoonDetailPage({ 
    params : { id : webtoonId },
} : { 
    params : { id : string } 
}) {
    return (
            <div className='flex flex-col justify-center rounded-xl p-20 mx-auto text-white mt-6 border-white border-2 max-w-[1084px]'>
                <WebtoonDetail webtoonId={webtoonId} />
                <Comments pathname = {"/webtoon"} webtoonId={webtoonId} type='webtoon' isForm />
            </div>
    )
}
