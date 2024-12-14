'use client'

import React, { ButtonHTMLAttributes, FormEvent, useState, MouseEvent } from 'react'
import { SERVER_URL, genre } from '../models/globalVar';
import { ModuleSource } from 'module';

const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일']

export default function Search() {
    const [keyword, setKeyword] = useState<string>('');
    const [genres, setGenres] = useState<string>('');
    const [days, setDays] = useState<string>('')
    // const {data, isLoading, error} = useSWR(`/api/search/?keyword=${keyword}&genre`)

    async function onSubmit(e:MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        await fetch(`${SERVER_URL}/search?keyword=${keyword}&genre=${genres}&week=${days}&page=0`)
        .then(res=>{
            if(res) {
                return res.json()
                    .then(res=>{
                        console.log("받아온 데이터 : ", res)
                    })
            }
            else {
                console.log("데이터가 없다...")
            }
        })
        
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
                            onSubmit(e)
                            setGenres('');
                            setDays('');
                }}>검색</button>
            </form>          
            <span>장르</span>                  
            <div className = 'grid grid-rows-2 grid-cols-4 gap-3 mb-9 mt-1'>
                {
                    genre.map((genre, index)=>{
                        return(
                            <button 
                                className ={`p-3 border-sky-200 border-[0.05rem] rounded-md ${genres === genre && 'bg-sky-200 border-white text-black'}`}
                                onClick = {()=>{
                                    genre === '기타' ? setGenres('') : setGenres(genre)
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
                            <button 
                                className ={`p-3 w-[10%] border-sky-200 border-[0.05rem] rounded-md ${days === day && 'bg-sky-200 border-white text-black'}`}
                                onClick = {()=>{setDays(day)}}
                            >{day}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}
