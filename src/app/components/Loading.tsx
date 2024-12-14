'use client';

import { LOADING_STATES, NavigationContext, useNavigationContext } from "../context/NavigationContext"
import gsap from "gsap";
import { useEffect, useRef, useContext, useState } from "react";

export const Loading = () => {
  const { loading, setLoading } = useContext(NavigationContext)
  const background = useRef<HTMLDivElement>(null);
 
  const _init = () => {
    console.log("Initalized Loading Component");
    /*Add your initial state here */
    gsap.set(background.current, {
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      y : "-150%",
      // onComplete: () => {
      // //   if (loading === LOADING_STATES.INIT) setLoading(LOADING_STATES.LOADED);
      // },
    });
  };

  const _enter = () => {
    console.log("Performing Loading out");
    /*Add your page enter animation*/
    gsap.to(background.current, {
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      y : "-150%",
      duration: 1,
      ease: "power3.inOut",
    });
  };

  const _exit = () => {
    console.log("Performing Loading in");
    /*Add your page exit animations*/
    gsap.to(background.current, {
      // clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      y : "0%",
      duration: 1,
      ease: "power3.inOut",
      
    });
  };

  useEffect(() => {
    _init();
  }, []);

  useEffect(() => {
      // loading === LOADING_STATES.INIT ? _exit() : null;
      loading === LOADING_STATES.LOADED ? _enter() : null;
      loading === LOADING_STATES.LOADING ? _exit() : null;
  }, [loading]);

  return (
    <div
      ref={background}
      className="h-[200%] w-full fixed flex flex-col gap-4 items-center justify-center bg-gray-800 z-50"
    >
      <p className="text-2xl font-medium"></p>
    </div>
  );
};