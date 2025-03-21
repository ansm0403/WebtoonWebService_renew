/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Comment } from "@models/comment"

interface CommentListProps {
  comments?: Comment[];
  displayStore?: boolean;
  commentRefetch?: () => void;
  totalCommentRefetch? : () => void;
}

export default function CommentList({
  comments,
  displayStore,
  commentRefetch,
  totalCommentRefetch
}: CommentListProps) {
    const { data: session } = useSession();

    const handleDeleteComment = async ({
        commentId, webtoonId
    } : {
        commentId : string, webtoonId : string
    }) => {
        const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

        if (confirm) {
        try {
            const params = { comment : commentId, webtoon : webtoonId }
            const result = await axios.delete(`/api/comment?comment=${commentId}&webtoon=${webtoonId}`);

            if (result.status === 200) {
            toast.success("댓글을 삭제했습니다.");
            commentRefetch?.();
            totalCommentRefetch?.();
            } else {
            toast.error("다시 시도해주세요.");
            }
        } catch (e) {
            console.log(e);
        }
        }
    };
    
    console.log("코멘트는?? : ", comments)

    return (
        <div className="my-10">
        { comments && comments.length > 0 ? (
            comments?.map((comment) => (
            <div
                key={comment.id}
                className="flex items-center space-x-4 text-sm text-white mb-8 border-b border-gray-100 pb-8"
            >
                <div>
                <img
                    src={comment?.author.image || "/images/default_profile.png"}
                    width={40}
                    height={40}
                    className="rounded-full bg-gray-10 h-10 w-10"
                    alt="profile image"
                />
                </div>
                <div className="flex flex-col space-y-1 flex-1">
                <div className="font-bold">{comment?.author?.name}</div>
                <div className="text-xs">
                    {new Date(comment?.createdAt)?.toLocaleDateString()}
                </div>
                <div className="text-white mt-1 text-base">{comment?.body}</div>
                {/* {displayStore && comment.store && (
                    <div className="mt-2">
                    <Link
                        href={`/stores/${comment.store.id}`}
                        className="text-gray-500 hover:text-gray-400 text-xs underline font-medium"
                    >
                        {comment.store.name}
                    </Link>
                    </div>
                )} */}
                </div>
                <div>
                {comment?.author.id === session?.user.id as string && (
                    <button
                    type="button"
                    onClick={() => handleDeleteComment({
                        commentId : comment.id, 
                        webtoonId : comment.webtoon.id
                    })}
                    className="underline text-gray-500 hover:text-gray-400"
                    >
                    삭제
                    </button>
                )}
                </div>
            </div>
            ))
        ) : (
            <div className="p-4 border border-gray-200 rounded-md text-sm text-white">
            댓글이 없습니다.
            </div>
        )}
        </div>
    );
}