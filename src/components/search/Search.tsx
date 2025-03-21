'use client'

import React, { useState, MouseEvent, useRef, useEffect } from 'react'
import { genre } from '@models/globalVar';
import axios from 'axios';
import { webtoon } from '@/models/webtoon';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import SearchList from '@component/search/SearchResultList';
import useDebounce from '@/hook/useDebounced';
import { useIntersectionObserver } from '@/hook/useIntersectionObserver';

const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일']

export default function Search() {

    const [genres, setGenres] = useState<string[]>([]);
    const [days, setDays] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const debouncedKeyword = useDebounce(keyword);

    // 무한 스크롤로 맨 아래에 도달하면 추가 데이터를 가져오기 위한 Ref
    const ref = useRef<HTMLDivElement | null>(null);
    const pageRef = useIntersectionObserver(ref, {});
    const isPageEnd = pageRef?.isIntersecting;

    const params = { keyword : debouncedKeyword, genre : genres, day : days, size : 5 }

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey : ['search-webtoons', params ],
        queryFn : ({ pageParam }) => fetchSearchData(pageParam),
        getNextPageParam : ({webtoons, page}) => {
            return webtoons.length !== 0 ? page : undefined;
        },
        initialPageParam : 0,
        enabled : ( !!debouncedKeyword || !!genres.length || !!days )
    })
    
    const fetchSearchData = async (pageParam : number) => {
        const page = pageParam;
        const searchParams = { ...params, page }

        const { data : webtoons } = await axios.get<webtoon[]>(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/search`, { params : searchParams});

        return { webtoons, page : page + 1 } // page가 getNextPageParam의 인수로 1이 더해져서 전달 ex) 3이 fetchSearchData의 인수로 들어와서 4로 리턴된다.
    }

    useEffect(()=>{
        if(isPageEnd && data && hasNextPage) fetchNextPage();

    }, [data, isPageEnd, fetchNextPage, hasNextPage])

    const onSubmit = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const handleGenreSelect = async (e : MouseEvent<HTMLButtonElement>) => {
        const genre = e.currentTarget.value;

        // 눌려져있는 장르 필터로 활성화 <-> 비활성화화 토글
        if(genres.includes(genre)){
            setGenres(prev => {
                return prev.filter((e) => e !== genre)
            })
            return;
        }

        // 기타 버튼이 눌러져있을 때 다른 버튼 클릭 금지.
        if(genres.includes("기타")) return;

        // 다른 버튼들 누른 상태에서 기타 누를 시 기타 버튼튼만 활성화
        if(genre === "기타"){
            setGenres(["기타"]);
            return;
        }

        // 누른 버튼 활성화
        setGenres((prev) => {
            const arr = [...prev];
            arr.push(genre);
            return arr;
        })
    }

    const handleDayButton = (e : MouseEvent<HTMLButtonElement>) => {
        // 이미 클릭한 요일 버튼 토글
        if(days === e.currentTarget.value){
            setDays("");
            return;
        }
        setDays(e.currentTarget.value);
    }

    const webtoons = data?.pages.map(({ webtoons }) => webtoons).flat()

    return (
        <>
            <div className = 'p-5 mt-10 m-auto w-[80%] sm:w-[600px] h-[50%] text-gray-50'>    
                <form className = 'mb-9'>
                    <input 
                        type = 'text' 
                        autoFocus 
                        placeholder='Search for a Webtoon title'
                        value = {keyword}
                        onChange = {(e)=>{setKeyword(e.target.value)}}
                        className = 'p-3 mr-4 w-[50%] h-7 rounded-md text-black'
                    />
                    <button 
                            className = 'hover:opacity-60 border-sky-200 border-[0.05rem] rounded-md py-1 px-2'
                            onClick = {(e)=>{
                                setGenres([]);
                                setDays('');
                                onSubmit(e)
                    }}>검색</button>
                </form>          
                <span>장르</span>                  
                <div className = 'grid grid-rows-2 grid-cols-4 gap-3 mb-9 mt-1'>
                    {
                        genre.map((genre, index)=>{
                            return(
                                <button key = {`${genre}_${index}`}
                                    className ={`p-3 border-sky-200 border-[0.05rem] rounded-md ${genres.includes(genre) && 'bg-sky-200 border-white text-black'}`}
                                    value={genre}
                                    onClick = {(e)=>{handleGenreSelect(e)}}    
                                >{genre}</button>
                            )
                        })
                    }
                </div>
                <span>요일</span>
                <div className = 'flex justify-between mt-1'>
                    {
                        dayOfWeek.map((day, index)=>{
                            return(
                                <button key = {`${day}_${index}`}
                                    className ={`p-3 w-[10%] border-sky-200 border-[0.05rem] rounded-md ${days === day && 'bg-sky-200 border-white text-black'}`}
                                    value = {day}
                                    onClick = {(e)=>{handleDayButton(e)}}
                                >{day}</button>
                            )
                        })
                    }
                </div>
                {
                    isLoading 
                    ? <SearchList.skeleton /> 
                    : <SearchList webtoons={webtoons}/>
                }
                <div ref={ref} className='w-full h-3 mb-10 touch-none'></div>
                {
                    ( isFetchingNextPage && hasNextPage ) && <SearchList.skeleton />
                }
            </div>
        </>
    )
}

