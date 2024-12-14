'use client'
import React from 'react'
import { WebtoonListPage } from '../models/webtoonType'
import WebtoonList from './WebtoonList';
import Navigate from './Navigate';
import { usePathname } from 'next/navigation';

type Props = {
    ListPageInfo : WebtoonListPage;
}

export default function PageListNumber({ListPageInfo} : Props) {
    const {totalElements, totalPages, size, number, numberOfElements, pageable : {pageNumber, pageSize}} = ListPageInfo; 
    // 1. 처음 페이지에 들어가면  1 ~ 10 까지 페이지번호와 다음페이지, 마지막으로 라는 버튼이 나온다.
    // 2. 1~10 번호를 누르면 /genre/{genre}?page={1~10} 로 이동한다.
    // 3. 만약 다음페이지 버튼을 누르면 11~20 과 다음페이지, 이전페이지, 마지막으로, 처음으로 라는 버튼이 나온다.
    // 4. 반복.
    const pathName = usePathname();

    let startPage = Math.floor(pageNumber/pageSize) * pageSize + 1;
    let endPage = startPage + pageSize - 1;
    if(endPage >= totalPages) endPage = totalPages;


    function pageButton(){
        let arr = [];
        for(let iCount = startPage; iCount <= endPage; iCount++){
            if(iCount === pageNumber){
                arr.push(<p className = 'p-1 text-center text-red-600'>{iCount}</p>)
            }
            else{
                arr.push(
                    <Navigate href={`${pathName}?page=${iCount}`}>
                        <p className = "text-white p-1 text-center">{iCount}</p>
                    </Navigate>
                )
            }
        }
        return arr;
    }

    return (
        <div className = 'flex flex-row gap-6 justify-center mb-9'>
            { startPage > 1 && <button className = 'text-white'>처음</button> }
            <button className = {`text-white text-xl ${startPage === 1 && 'pointer-events-none'}`}>{'<'}</button>
            { pageButton() }
            <button className = {`text-white text-xl ${endPage === totalPages && 'pointer-events-none'}`}>{'>'}</button>
            { endPage < totalPages && <button className = 'text-white'>마지막</button>}
        </div>
    )
}
