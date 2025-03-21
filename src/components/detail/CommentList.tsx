import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function CommentList({
    params : { id }
} : { 
    params : { id : string } 
}) {

    const fetchComments = async () => await axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/webtoon/${id}`);

    const { data : comments } = useQuery({
        queryKey : ["comments", id],
        queryFn : fetchComments
    })

    return (
    
    )
}
