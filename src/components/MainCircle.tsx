import '@/app/globals.css'
import React from 'react'
import CircularSector from '@component/CircularSector'
import { getMainCircleThumnail } from '@service/webtoonInfo'

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
