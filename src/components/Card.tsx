'use client'

import React from 'react'
import '@/app/globals.css'
import { webtoon } from '@models/webtoon'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import HeartEmptyIcon from './ui/HeartEmptyIcon'
import HeartIcon from './ui/HeartIcon'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type Props = {
    webtoon : webtoon,
    children : React.ReactNode
    refetch : () => void
    index : number,
    page? : string,
    queryKey : string[]
}

export default function Card({
    webtoon,
    children, 
    refetch, 
    index,
    page,
    queryKey
} : Props ) {
    const { title, thumbnailUrl, likeUsers } = webtoon;
    const { data : session } = useSession();
    const liked = session ? likeUsers?.includes(session.user.id) : false;
    const queryClient = useQueryClient();

    // const loadingRef = useRef<HTMLDivElement>(null)  

    const setLike = async (webtoonId : string, liked : boolean) => {
        const { data, status } = await axios.put(`/api/like?userId=${session?.user.id}&webtoonId=${webtoonId}`, { liked })

        refetch();
        return { data, status }
    }

    const { mutate } = useMutation({
        mutationFn : () => setLike(webtoon._id, !liked),
        onMutate : async () => {
            const previousWebtoon = queryClient.getQueryData<webtoon[]>(queryKey) as webtoon[];
            const like = !liked;

            const newWebtoons = [...previousWebtoon];

            let newData = undefined

            if(like) {
                newData = {
                    ...webtoon,
                    likeUsers : (likeUsers ? [...likeUsers, session?.user.id as string] : new Array(session?.user.id as string))
                }
            } else {
                newData = {
                    ...webtoon,
                    likeUsers : [...likeUsers].filter((id) => id !== session?.user.id)
                }
            }
            queryClient.setQueryData(queryKey, ()=>{
                newWebtoons[index] = newData;
                return newWebtoons;
            })

            return { previousWebtoon };
        },
        onSuccess : () => {

        },
        onError : (error, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousWebtoon)
        },
        onSettled : () => {
            queryClient.invalidateQueries({queryKey : queryKey})
        }
    })

    return (
        <div className = 'relative border-2 text-center rounded-md border-none overflow-hidden  '>
            <Link href = {`/webtoon/${webtoon._id}`} className = 'relative mx-auto min-w-[200px] max-w-[250px] h-[300px]'>
                {/* // eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    className = "border-none border-2 rounded-xl cursor-pointer hover:scale-90 transition-transform" 
                    src = {`${thumbnailUrl}`} 
                    alt = 'card image' 
                    // fill = {true}
                    // onLoadingComplete={()=>{loadingRef.current?.remove()}}    이미지 로딩 애니메이션
                ></img>
                {/* <div className = 'imageLoading' ref={loadingRef}></div> */}
            </Link>
            <p className = 'mt-2  text-stone-400'>{title}</p>
            {
               session && ( !liked ? <HeartEmptyIcon onClick={() => mutate()} /> : <HeartIcon onClick = {() => mutate()}/> )
            }
            {children}
        </div>
    )
}

