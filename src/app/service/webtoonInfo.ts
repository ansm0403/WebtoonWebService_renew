import path from "path"
import {promises as fs, readFile} from 'fs'
import { Webtoon } from "../models/webtoonType";

// export default async getWebtoonThumnail(){
//     fetch('',)
// }

export type BackgroundImage = {
    url : string;
}
export type WebtoonThum = {
    thumnail : string
}


export async function getBackgroundImage() : Promise<BackgroundImage[]>{
    const filePath = path.join(process.cwd(), 'data', 'background.json');
    return fs.readFile(filePath, 'utf-8')
    .then<BackgroundImage[]>(JSON.parse)
}

// export async function getMainCircleThumnail() : Promise<string[]>{
//     const thumnails : string[] = [];
//     const webtoonsInfo = await getAllWebtoonInfo();   
// }


export async function getMainCircleThumnail() : Promise<WebtoonThum[]>{
    const filePath = path.join(process.cwd(), 'data', 'webtoonThum.json');
    return fs.readFile(filePath, 'utf-8')
    .then<WebtoonThum[]>(JSON.parse)
}

export async function getGenreCircleThumnail() : Promise<WebtoonThum[]>{
    const filePath = path.join(process.cwd(), 'data', 'genre.json');
    return fs.readFile(filePath, 'utf-8')
    .then<WebtoonThum[]>(JSON.parse)
}

export async function getWebtoonRank(webtoons : Webtoon[]) : Promise<Webtoon[]>{
    const webtoonRanks = webtoons.sort((webtoon1, webtoon2)=>{
        return webtoon2.likeProportion - webtoon1.likeProportion;
    })
    return webtoonRanks;
}
