import axios from "axios";
import { webtoon } from "@models/webtoon";

// 처음 페이지에 진입 시 1페이지 보여줌. page = 1, size = 10, lastLikePropotion = null, lastId = null
// 내가 만약 5페이지를 누르면 page = 5, size = 10, lastLikeProportion,  lastId = 4페이지 마지막 데이터

export async function usePagedRankWebtoons(
    page : string = '1', 
    size : number = 10, 
) : Promise<webtoon[]>
{
    const params = { size : 10, page}
    const { data } = await axios('/api/rank', { params });

    return data as webtoon[]
}

