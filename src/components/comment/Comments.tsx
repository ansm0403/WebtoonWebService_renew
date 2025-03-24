'use client'

/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import CommentForm from "@component/comment/CommentForm";
import axios from "axios";

import CommentList from "@component/comment/CommentList";
import Pagination from "../Pagination";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Comment } from "@/models/comment";
import { getTotalComment } from "@/service/comment";
import { FadeLoader } from "react-spinners";

interface CommentProps {
  webtoonId?: string;
  type : "webtoon" | "author"
  limit? : number
  isForm? : boolean
  isBlack? : boolean
}

export default function Comments({ 
    webtoonId, type, limit = 5, isForm = false, isBlack = false
}: CommentProps
) {
    const { data : session, status } = useSession();

    let id = ""

    if(type === "webtoon") id = webtoonId as string;
    else if(type === "author") id = session?.user.id as string;

    const page = useSearchParams().get("page") ?? "1";
    const params = { id, limit : 5, page, type }

    const fetchComments = async () => {
        const { data : comments } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`, { params }
        );
        return comments
    }; 

    const { data: comments, refetch : commentRefetch, isLoading } = useQuery<Comment[]>({
        queryKey : [`comments-${id}-${page}`],
        queryFn : fetchComments
    });

    const { data : totalComment, refetch : totalCommentRefetch } = useQuery({
        queryKey : ['totalComment', id],
        queryFn : () => getTotalComment(id, type)
    })
    
    if(isLoading) return (
        <div className="flex justify-center items-center h-[300px] ">
            <FadeLoader />
        </div>
    )

    return (
        <div className="w-full md:max-w-[920px] py-8 mb-20 mx-auto">
            {/* comment list */}
            <CommentList 
                comments={comments} 
                commentRefetch={commentRefetch} 
                totalCommentRefetch={totalCommentRefetch}
                type = {type}
            />
            
            <Pagination
                totalCount={totalComment ?? 0}
                limit = {limit}
                pathname={`/webtoon/${id}`}
                isBlack = {isBlack}
            />

            {/* comment form */}
            {( status === "authenticated" && isForm ) && (
                <CommentForm webtoonId={id} 
                    commentRefetch = {commentRefetch} 
                    totalCommentRefetch = {totalCommentRefetch}
                />
            )}
            
        </div>
    );
}