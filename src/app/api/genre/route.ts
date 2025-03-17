import { NextResponse } from 'next/server'
import React from 'react'

export function GET(request:Request) {
    console.log('장르로 들어왔당')
    return NextResponse.json('안녕!!');
}
