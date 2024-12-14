import React from 'react'
import CircularSector from './CircularSector'
import { getGenreCircleThumnail } from '../service/webtoonInfo'

const webtoonPageUrl = [
    '/genre/action',
    '/genre/fantasy',
    '/genre/wuxia',
    '/genre/daily',
    '/genre/sports',
    '/genre/romance',
    '/genre/mystery',
]

export default async function GenreCircle() {
    
    const thumnails = await getGenreCircleThumnail()

    return (
        <CircularSector sectorNum={7} thumnails={thumnails} pageUrl = {webtoonPageUrl}></CircularSector>
     )
}
