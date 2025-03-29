'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CommentFormProps {
  webtoonId: string;
  pathname : string
  commentRefetch: () => void;
  totalCommentRefetch : () => void;
}

export default function CommentForm({ 
  webtoonId,
  pathname,
  commentRefetch,
  totalCommentRefetch 
} : CommentFormProps
) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const navigate = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`, {
          ...data,
          webtoonId,
        });

        if (result.status === 200) {
          toast.success("댓글을 등록했습니다.");
          resetField("body");
          commentRefetch?.();
          totalCommentRefetch?.();
          navigate.push(`${pathname}/${webtoonId}?page=1}`)
        } else {
          toast.error("다시 시도해주세요");
        }
      })}
      className="flex flex-col space-y-2 mb-5"
    >
      {errors?.body?.type === "required" && (
        <div className="text-xs text-red-600">필수 입력사항입니다.</div>
      )}
      <textarea
        rows={3}
        placeholder="댓글을 작성해주세요..."
        {...register("body", { required: true })}
        className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-white placeholder:text-gray-400 text-sm leading-6"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm mt-2 rounded-md"
      >
        작성하기
      </button>
    </form>
  );
}