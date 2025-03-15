'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {gsap} from 'gsap-trial'
import {SplitText} from "gsap-trial/SplitText";

export default function InitTransition() {
    const background = useRef<HTMLDivElement>(null)
    const texts = useRef<HTMLDivElement>(null)
    const h2Text = useRef(null)
    const [transitState, setTransitState] = useState<boolean>(true)
    gsap.registerPlugin(SplitText);
    
    useLayoutEffect(()=>{
        
        let textSplit = new SplitText(texts.current,{type : "chars"})

        gsap.set(textSplit.chars, {
            opacity : 0,
            y : 100,
            autoAlpha : 1,
        })

        if(transitState === true){
            const ctx = gsap.context(()=>{
                gsap.set(background.current,{
                    opacity : 1,
                    duration : 3,
                })
                const tl = gsap.timeline()
                tl.to(textSplit.chars, {
                    opacity : 1,
                    y : -96,
                    ease : "back",
                    duration : 1,
                    stagger : 0.1,
                })
                tl.to(h2Text.current,{
                    opacity : 1,
                    y : -100,
                    ease : "back",
                    duration : 1,
                })
                // tl.to(h2Text.current, {
                //     opacity : 1,
                //     y : 0,
                //     ease : "back",
                //     duration : 1,
                // })
                tl.to(background.current,{
                    opacity : 0,
                    zIndex : "-1",
                    ease : "expoScale(0.1, 7, none)",
                    duration : 2,
                    onComplete : ()=>{
                        setTransitState(false);
                    }
                })
                return () => textSplit.revert();
            }, background)
            return () => ctx.revert();
        }
    },[])
    
    return (
        <div ref={background} className = 'w-full h-full fixed top-0 left-0 text-center bg-gray-800 z-[100]'>
            <div ref={texts} className = 'relative top-[40%] text-6xl font-bold text-white overflow-hidden'>
                <div className='relative translate-y-24 tracking-[0.7em]'>
                    WEBTOON
                </div>
            </div>
            <h2 ref={h2Text} className = 'relative top-[55%] mt-5 text-sky-400 opacity-0'>By Wonchan Jeongmin Sangmoon</h2>
        </div>
    )
}
