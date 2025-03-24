
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
    page : string
}

export default function Card({
    webtoon,
    children, 
    refetch, 
    index,
    page
} : Props ) {
    const { title, thumbnailUrl, likeUsers } = webtoon;
    const { data : session } = useSession();
    const liked = session ? likeUsers?.includes(session.user.id) : false;
    const queryClient = useQueryClient();

    // const loadingRef = useRef<HTMLDivElement>(null)  

    const setLike = async (webtoonId : string, liked : boolean) => {
        const { data, status } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/like?userId=${session?.user.id}&webtoonId=${webtoonId}&like=${liked}`)

        refetch();
        return { data, status }
    }

    const { mutate } = useMutation({
        mutationFn : () => setLike(webtoon._id, !liked),
        onMutate : async () => {
            const previousWebtoon = queryClient.getQueryData<webtoon[]>(["rank", page]) as webtoon[];
            const like = !liked;

            const newWebtoons = [...previousWebtoon];
            let newData = undefined

            if(like) {
                newData = {
                    ...webtoon,
                    likeUsers : (likeUsers ? [...likeUsers, session?.user.id as string] : new Array(session?.user.id as string))
                }
            } else {
                newData ={
                    ...webtoon,
                    likeUsers : [...likeUsers].filter((id) => id !== session?.user.id)
                }
            }

            queryClient.setQueryData(["rank", page], ()=>{
                newWebtoons[index] = newData;
                return newWebtoons;
            })

            return { previousWebtoon };
        },
        onSuccess : () => {
            console.log("성공");
        },
        onError : (error, variables, context) => {
            queryClient.setQueryData(["rank", page], context?.previousWebtoon)
        },
        onSettled : () => {
            queryClient.invalidateQueries({queryKey : ["rank", page]})
        }
    })

    return (
        <div className = 'relative border-2 text-center rounded-md border-none overflow-hidden hover:scale-90 transition-transform'>
            <Link href = {`${process.env.NEXT_PUBLIC_SERVER_URL}/webtoon/${webtoon._id}`} className = 'relative mx-auto min-w-[200px] max-w-[250px] h-[300px]'>
                {/* // eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    className = "border-none border-2 rounded-xl cursor-pointer" 
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
