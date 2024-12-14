'use client'

import React, { createContext, useEffect, useState } from 'react'
import { WebtoonListPage } from '../models/webtoonType';
import PageListNumber from '../components/PageListNumber';

type Props = {
    children  : React.ReactNode;
    firstList : string;
}

export const WebtoonListContext = createContext<WebtoonListPage | null>(null);

export default function WebtoonListContextProvider({children, firstList} : Props) {
    // const [webtoonList, setWebtoonList] = useState<WebtoonListPage>()

    useEffect(()=>{
        (async ()=>{
            await fetch(firstList, {method : 'GET'})
            .then(res => res.json())
            .then(res => setWebtoonList(res));
        })();
        // (async ()=>{
        //     await fetch(``, {method : 'GET'})
        //     .then(res => res.json())
        //     .then(res => setAllWebtoonList(res));
        // })();
    },[])

    useEffect(()=>{
        console.log('모든 웹툰은???', webtoonList)
    },[webtoonList])
    // useEffect(()=>{
    //     console.log('장르웹툰은???', allWebtoonList)
    // },[setAllWebtoonList])

    return (
        <>
            {
                webtoonList 
                    ? 
                    <WebtoonListContext.Provider value={webtoonList}>
                        {children}
                    </WebtoonListContext.Provider>
                    : 
                    <div className = "w-[400px] h-[250px] text-red border-2 border-sky-500">
                        아 데이터 안옴 ㅠㅠ
                    </div>
            }
       </>
    )
}
