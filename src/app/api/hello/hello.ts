import { NextResponse } from 'next/server'
import React from 'react'

export default function GET(request : Request) {
  return (
    NextResponse.json(`${request.body} 안녕하세요.`)
  )
}
