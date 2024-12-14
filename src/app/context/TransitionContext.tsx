'use client';

import React from 'react'
import '../../app/globals.css'
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

type Props = {
    children : React.ReactNode;
    key : string;
    classNames : string;
    timeout : number;
}

export default function TransitionContext({children, key, classNames, timeout} : Props) {
  return (
    <TransitionGroup className = 'relative'>
        <CSSTransition key = {key} classNames = {classNames} timeout = {timeout}>
            {children}
        </CSSTransition>
    </TransitionGroup>
  )
}
