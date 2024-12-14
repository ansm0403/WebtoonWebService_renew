'use client'
import React, { useEffect, useRef, useState } from 'react'
import "../globals.css"
import { BackgroundImage, getBackgroundImage } from '../service/webtoonInfo';
import Image from 'next/image'
import { useWindowSize } from '../service/screenResize';
import gsap from 'gsap';

type Props = {
    backgroundImage : BackgroundImage[];
}

export default function Background({backgroundImage} : Props) {
    // 이미지 
    const browser = useWindowSize();

    const imageWidth = browser.width/6
    const imageHeight = browser.height/2
    
    const bgRef = useRef(null)
    

    useEffect(()=>{
        const bgClass = document.querySelectorAll<HTMLElement>('.bgAni');
        const ctx = gsap.context(()=>{
            gsap.set(bgClass,{
                opacity : 1,
            })
            const tl = gsap.timeline()
            tl.to(bgClass,{
                opacity : 0,
                ease : 'power3.inOut',
                duration : 2,
                stagger : 2,
            })
        })
    },[])

    return (
        <div className='fixed top-0 left-0 w-screen h-screen overflow-hidden opacity-40 z-[-99]'>
            <Image ref={bgRef} src = {backgroundImage[0].url} alt = '0' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[60%] left-[78%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[1].url} alt = '1' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[10%] left-[15%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[2].url} alt = '2' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[-5%] left-[30%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[3].url} alt = '3' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[60%] left-[20%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[4].url} alt = '4' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[-10%] left-[50%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[5].url} alt = '5' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[10%] left-[65%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[6].url} alt = '6' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[20%] left-[80%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[7].url} alt = '7' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[75%] left-[40%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[8].url} alt = '8' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[50%] left-[5%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[9].url} alt = '9' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[70%] left-[-5%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[10].url} alt = '10' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[50%] left-[60%] '></Image>
            <Image ref={bgRef} src = {backgroundImage[11].url} alt = '11' width={imageWidth} height={imageHeight} className = 'bgAni absolute top-[2%] left-[2%] '></Image>
        </div>
    );
}
