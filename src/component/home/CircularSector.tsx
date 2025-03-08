'use client'

import React, {  MouseEvent, useState, useRef, RefObject } from 'react'
import "../../app/globals.css"

import { WebtoonThum } from '@/remote/homeCircle'
import Navigate from '@component/shared/Navigate'


const mainCircle = [
    '검색', 
    '신작 웹툰', 
    '웹툰 랭킹', 
    '장르별 웹툰보기', 
    '웹툰 추천받기',
]

type Props = {
    sectorNum : number,
    thumnails : WebtoonThum[],
    pageUrl : string[]
}
let circleRef : RefObject<HTMLDivElement>


export default function CircularSector({sectorNum, thumnails, pageUrl} : Props) {

    const sectorOpacity : boolean[] = [];
    const sectorSkew : boolean[] = [];
    const skewExp = (10*sectorNum-32);
    const rotateExp = (0+(360/sectorNum));
    circleRef = useRef<HTMLDivElement>(null);

    for(let i = 0; i < sectorNum; i++){ 
        sectorOpacity.push(false) 
        sectorSkew.push(false)
    }

    const [sectorOpacityState, setSectorOpacityState] = useState<boolean[]>(sectorOpacity);
    const [sectorSkewState, setSectorSkewsState] = useState<boolean[]>(sectorSkew)

    const mouseOver = (e : MouseEvent<HTMLDivElement>, sectorListIndex : number) => {

        const newSectorOpacityState = sectorOpacityState.map((sectorState, index)=>{
            return sectorListIndex !== index ? sectorState = true : sectorState = false
        })
        const newSectorSkewState = sectorSkewState.map((sectorState, index)=>{
            return sectorListIndex === index ? sectorState = true : sectorState = false 
        })
        const sectors = document.querySelectorAll<HTMLElement>('.sector');
        sectors[sectorListIndex].style.transform = `rotate(${rotateExp*sectorListIndex-15}deg) skew(${skewExp-20}deg)`
        sectors[sectorListIndex].style.zIndex = `${sectorNum}`
        
        setSectorOpacityState([...newSectorOpacityState])
        setSectorSkewsState([...newSectorSkewState])
    }
    const mouseOut = (e : MouseEvent<HTMLDivElement>, sectorListIndex : number) => {

        const newSectorOpacityState = sectorOpacityState.map((sectorState)=>{
            return sectorState = false;
        })
        const newSectorSkewState = sectorSkewState?.map((sectorState)=>{
            return sectorState = false;
        })
        const sectors = document.querySelectorAll<HTMLElement>('.sector');
        sectors[sectorListIndex].style.transform = `rotate(${rotateExp*sectorListIndex}deg) skew(${skewExp}deg)`
        sectors[sectorListIndex].style.zIndex = `${sectorListIndex}`

        setSectorOpacityState([...newSectorOpacityState])
        setSectorSkewsState([...newSectorSkewState])
    }
   

    return (
        <div className = "circle items-center mt-10 text-center" ref={circleRef}>
            <div className = "wrapper m-auto">
                {
                    thumnails.map((thumnail, i)=>{
                        return(
                            <Navigate href = {pageUrl[i]} key = {`${thumnail}`} >
                                <div key = {i} className = {`sector ${(sectorOpacityState[i] === true) && 'hoverOpacity'}`}
                                    style = {{
                                        transform : `
                                            rotate(${rotateExp*i}deg) 
                                            skewX(${skewExp}deg)
                                        `,
                                        backgroundImage : `url(/images/${thumnail.thumnail})`,
                                        zIndex : `${i}`
                                    }}
                                    onMouseOver={(e)=>{mouseOver(e, i)}}
                                    onMouseOut={(e)=>{mouseOut(e, i)}}
                                >
                                    {/* <p className = "relative top-[90%] text-right align-text-bottom">{mainCircle[i]}</p> */}
                                </div>
                            </Navigate>
                         )
                    })
                }
            </div>
        </div>
    )
}