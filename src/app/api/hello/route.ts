import { NextResponse } from 'next/server'
import React from 'react'

export function GET(request : Request) {
  return (
    NextResponse.json(`하이@@@@@@@@`)
  )
}
