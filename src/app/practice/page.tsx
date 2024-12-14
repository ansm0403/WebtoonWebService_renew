'use client'
import React, { useRef, useState } from 'react'
import '../globals.css'
import { Container, Button, Alert } from 'react-bootstrap';

import TransitionContext from '../context/TransitionContext'
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group'

export default function PracticePage() {
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);
  return (
    <>
        <button onClick={()=>{setShowButton(true)}}>이걸 눌러야 showButton나온다.</button>
        <TransitionGroup>
            <CSSTransition in={showButton} classNames="fade" timeout={500}>
                <div>
                    <div style = {{padding : '10px', border : '1px solid red', width : '150px', textAlign : 'center', color : 'white', margin : 'auto'}}>안녕하세요</div>

                    <button onClick = {()=>setShowButton(false)}>눌러봐 씨발</button>
                </div>
            </CSSTransition>
        </TransitionGroup>
    </>
  )
}

// <div className = 'p-4 border-2 border-sky-500 w-[150px] text-white'>나가줄래?
//                 <button onClick = {()=>setShowMessage(false)}>아니 뭘보지</button>
//             </div>


// <Container style={{ paddingTop: '2rem' }}>
//       {showButton && (
//         <Button
//           onClick={() => setShowMessage(true)}
//           size="lg"
//         >
//           Show Message
//         </Button>
//       )}
//       <CSSTransition
//         in={showMessage}
//         nodeRef={nodeRef}
//         timeout={300}
//         classNames="alert"
//         unmountOnExit
//         onEnter={() => setShowButton(false)}
//         onExited={() => setShowButton(true)}
//       >
//         <Alert
//           ref={nodeRef}
//           variant="primary"
//           dismissible
//           onClose={() => setShowMessage(false)}
//         >
//           <Alert.Heading>
//             Animated alert message
//           </Alert.Heading>
//           <p>
//             This alert message is being transitioned in and
//             out of the DOM.
//           </p>
//           <Button
//             variant="primary"
//             onClick={() => setShowMessage(false)}
//           >
//             Close
//           </Button>
//         </Alert>
//       </CSSTransition>
//     </Container>