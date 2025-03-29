import { getWebtoonResponse } from '@/service/webtoon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';



export default function useLikeMutate(webtoonId : string, refetch : () => void, userId? : string, liked? : boolean ) {

  const queryClient = useQueryClient();

  async function setLike(){
    const { status } = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/like?userId=${userId}&webtoonId=${webtoonId}`, { 
      liked 
    })
    refetch();
    return { status }
  }

  const { mutate } = useMutation({
      mutationFn : () => setLike(),
      onMutate : async () => {
        const previousWebtoon = queryClient.getQueryData<getWebtoonResponse>(["webtoonDetail", webtoonId])
        const like = liked;

        let newWebtoon = undefined
        const likeUsers = previousWebtoon?.likeUsers

        if(like) {
            newWebtoon = {
              ...previousWebtoon,
              likeUsers : (likeUsers ? [...likeUsers, userId] : new Array(userId))
            }
        } else {
            newWebtoon = {
              ...previousWebtoon,
              likeUsers : likeUsers?.filter((id) => id !== userId)
            }
        }
        queryClient.setQueryData(["webtoonDetail", webtoonId], ()=>{
            return newWebtoon;
        })

        return { previousWebtoon }
      },
      onError(error, variables, context){
          queryClient.setQueryData(["webtoonDetail", webtoonId], context?.previousWebtoon)
      },
      onSettled : () => {
          queryClient.invalidateQueries({queryKey : ["webtoonDetail", webtoonId]})
        }
  }) 

  return mutate;
}
