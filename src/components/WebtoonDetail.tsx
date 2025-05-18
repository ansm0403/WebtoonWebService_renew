'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FadeLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getWebtoonResponse } from "@/service/webtoon";
import useLikeMutate from "@/hook/useDetailWebtoon";
import { getWebtoon } from '@/service/webtoon';
import dynamic from "next/dynamic";


const HeartIcon = dynamic(()=>import("./ui/HeartIcon"));

const HeartEmptyIcon = dynamic(()=>import("./ui/HeartEmptyIcon"));

export default function WebtoonDetail({webtoonId} : {webtoonId : string}) {
  
  const { data : session } = useSession();
  const userId = session?.user.id;

  // const getWebtoon = async (webtoonId : string) => {
  //   const { data } = await axios.get(`/api/webtoon/${webtoonId}`)
  //   return data;
  // }

  const { data : webtoon, isLoading, refetch } = useQuery<getWebtoonResponse>({
    queryKey : ["webtoonDetail", webtoonId],
    queryFn : () => getWebtoon(webtoonId)
  }) 

  const liked = userId ? webtoon?.likeUsers?.includes(userId) : false;

  const mutate = useLikeMutate(webtoonId, refetch, userId, !liked )

  const handleLikeButton = () => {
    mutate();
  }


  if(isLoading) return <div className="mx-auto m-28"><FadeLoader /></div>

  return (
    <div className="relative w-full  items-center">
        {
          session && (liked ? <HeartIcon onClick={handleLikeButton} /> : <HeartEmptyIcon onClick={handleLikeButton} />)
        }
        <img className = "mx-auto mb-10" src = {webtoon?.thumbnailUrl} width={300} />
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-white">WEBTOON INFORMATION</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Webtoon detail informations and comments</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">제목</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon?.title}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">장르</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon?.genre}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">요일</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon?.dayOfWeek}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">좋아요</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">{webtoon?.likeCount}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-white">플랫폼</dt>
            <dd className="mt-1 text-sm/6 text-white sm:col-span-2 sm:mt-0">
              {webtoon?.platform}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          </div>
        </dl>
        <div className="flex items-center justify-center">
          <Link 
            href = {webtoon?.url ?? ""} 
            className='mx-auto border-[1px] border-white rounded-md p-3 hover:opacity-40' 
            target='_blank'
          >보러가기</Link>
        </div>
      </div>
    </div>
  )
}