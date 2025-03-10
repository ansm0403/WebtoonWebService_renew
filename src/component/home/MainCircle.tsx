import '@/app/globals.css'
import React from 'react'
import CircularSector from '@component/home/CircularSector'
import { getMainCircleThumnail } from '@/remote/homeCircle'
// import TransitionContext from '../context/TransitionContext'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import { CircleTransition } from './CircleTransition'

const webtoonPageUrl =  [
    '/search',
    '/new',
    '/rank',
    '/genre',
    '/recommend',
]

export default async function MainCircle({sectorNum} : {sectorNum : number}) {
    const thumnails = await getMainCircleThumnail()

    return (
            <CircularSector sectorNum={sectorNum} thumnails={thumnails} pageUrl = {webtoonPageUrl}></CircularSector>
    )
}
