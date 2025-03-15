'use client'

import React, { useState, MouseEvent } from 'react'
import { SERVER_URL, genre } from '@models/globalVar';
import axios from 'axios';

const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일']

export default function Search() {
    const [keyword, setKeyword] = useState<string>("");
    const [genres, setGenres] = useState<string[]>([]);
    const [days, setDays] = useState<string>("");
    // const {data, isLoading, error} = useSWR(`/api/search/?keyword=${keyword}&genre`)

    async function onSubmit(e:MouseEvent<HTMLButtonElement>){
        e.preventDefault();

        const params = { keyword, genres, days }
        await axios.get(`${process.env.SERVER_URL}/search`, {params});

        // await fetch(`${SERVER_URL}/search?keyword=${keyword}&genre=${genres}&week=${days}&page=0`)
        // .then(res=>{
        //     if(res) {
        //         return res.json()
        //             .then(res=>{
        //                 console.log("받아온 데이터 : ", res)
        //             })
        //     }
        //     else {
        //         console.log("데이터가 없다...")
        //     }
        // })   
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

    return (
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
                                onClick = {(e)=>{handleGenreSelect(e)
                                    console.log("장르들 : ", genres);
                                }}    
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
        </div>
    )
}
