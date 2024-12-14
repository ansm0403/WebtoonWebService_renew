'use client'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SERVER_URL } from '../models/globalVar'
import { WebtoonComment } from '../models/webtoonType'
import CloseButton from './ui/CloseButton'
import EditIcon from './ui/EditIcon'
import ModalPortal from './ModalPortal'
import CommentWrite from './CommentWrite'
import { CommentContext } from '../context/CommentContextProvider'



export default function CommentList({webtoonId} : {webtoonId : number}) {
  const [comment, setComment] = useState<WebtoonComment[]>()
  const [commentModal, setCommentModal] = useState<boolean>(false);
  const {isChange, setIsChange} = useContext(CommentContext);

  function getComment(){
    ( async()=>
        await fetch(`${SERVER_URL}/comment/detail/${webtoonId}`)
        .then(res=>res.json())
        .then(res=>{
            if(res){
              setComment(res);
            }
        })
        .catch((error) => {
          console.log("댓글 로드 실패 : ", error.message) 
        })
    )()
  }


  useLayoutEffect(()=>{
    getComment();
  },[])
  useEffect(()=>{
    getComment();
    setIsChange(false)}
  ,[isChange])


  async function deleteComment(commentId : number){
    await fetch(`${SERVER_URL}/comment/delete/${commentId}`,{method : "delete"})
    .then((res)=>{
      if(res.status === 200) console.log("삭제완료 했습니다!");
    })
    .catch(error=>console.log(error.message));
    setIsChange(true);
  }

  const commentModalSet = () =>{
    setCommentModal(false);
  }

  return (
    <div className = 'flex flex-col text-sm'>
    {
      comment?.map((comment)=>{
        return (
          <div className = 'flex flex-row justify-between py-2  border-b-[0.125rem] border-[#eee]'>
            <div className = 'flex flex-row basis-[80%]'>
              <h1 className = 'font-bold mr-1 basis-[30%] text-right'>{comment.userId}</h1>  
              <h4 className=' before:content-["ㅣ"] before:text-gray-400 before:mr-3 overflow-x-auto scroll'>{comment.comment}</h4>
            </div>
            <div>
              <button className = 'mr-1' onClick={(e)=>setCommentModal(true)}>
                <EditIcon></EditIcon>
              </button>
              <button onClick = {e=>deleteComment(comment.id)}>
                <CloseButton isComment={true}></CloseButton>
              </button>
            </div>
            {
              commentModal && 
              <ModalPortal>
                <CommentWrite 
                  setCommentModal={commentModalSet} 
                  webtoonId={comment.id} 
                  method={{method : "PUT", url : "update"}}
                ></CommentWrite>
              </ModalPortal>
            }
          </div>
        )
      })
    }
    </div>
  )
}
