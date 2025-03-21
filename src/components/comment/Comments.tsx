'use client'

/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import CommentForm from "@component/comment/CommentForm";
import axios from "axios";

import CommentList from "@component/comment/CommentList";
import Pagination from "../Pagination";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Comment } from "@/models/comment";
import { getTotalComment } from "@/service/comment";

interface CommentProps {
  webtoonId: string;
}

export default function Comments({ 
    webtoonId,
}: CommentProps
) {
    const { status } = useSession();

    const page = useSearchParams().get("page") ?? "1";
    const params = { webtoonId, limit : 5, page }

    const fetchComments = async () => {
        const { data : comments } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`, { params }
        );
        return comments
    }; 

    const { data: comments, refetch : commentRefetch } = useQuery<Comment[]>({
        queryKey : [`comments-${webtoonId}-${page}`],
        queryFn : fetchComments
    });

    const { data : totalComment, refetch : totalCommentRefetch } = useQuery({
        queryKey : ['totalComment', webtoonId],
        queryFn : () => getTotalComment(webtoonId)
    })
    
    return (
        <div className="w-full md:max-w-[920px] py-8 mb-20 mx-auto">
            {/* comment list */}
            <CommentList 
                comments={comments} 
                commentRefetch={commentRefetch} 
                totalCommentRefetch={totalCommentRefetch}
            />
            
            <Pagination
                totalCount={totalComment ?? 0}
                limit = {5}
                pathname={`/webtoon/${webtoonId}`}
            />

            {/* comment form */}
            {status === "authenticated" && (
                <CommentForm webtoonId={webtoonId} 
                    commentRefetch = {commentRefetch} 
                    totalCommentRefetch = {totalCommentRefetch}
                />
            )}
            
        </div>
    );
}