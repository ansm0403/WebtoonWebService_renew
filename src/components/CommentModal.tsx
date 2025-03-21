'use client'

import React, { useState } from 'react'
import CommentWrite from '@component/CommentWrite';
import ModalPortal from '@component/ModalPortal';
// import { LoginContext } from '@context/LoginContextProvider';
import LoginAlert from '@component/LoginAlert';
import SignIn from '@/components/auth/SignIn';
import { useSession } from 'next-auth/react';

type Props = {
  webtoonId : string;
}

export default function CommentModal({webtoonId} : Props) {
  const [modal, setModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  // const {isLogin} = useContext(LoginContext);

  const { data : session } = useSession();

  const modalClose = () => {
    setModal(false)
  }
  const alertModalClose = () => {
    setAlertModal(true)
  }
  return (
    <div className = "relative flex col-start-1 col-end-3 justify-between">
      <p className = "pt-5">Comment</p>
      <button 
        className = "p-5 rounded-lg hover:opacity-40"
        onClick = {()=>{setModal(true)}}
      >작성하기</button>
        <ModalPortal>
          {
            (modal && session) &&
            <CommentWrite setCommentModal={modalClose} webtoonId={webtoonId} method={{method : "POST", url : "create"}}></CommentWrite>
          }
          {/* {
            (!modal || !isLogin) && 
            <LoginAlert onClose={modalClose}></LoginAlert>
          } */}
        </ModalPortal>
    </div>
  )
}

