import { NextRequest } from "next/server";


export async function POST(req : NextRequest){

    if(!req.body){
        return new Response('데이터가 없습니다.', { status : 404 });
    }

    const formData = req.formData()

    return new Response('데이터 전송 성공', { status : 200 });
}

