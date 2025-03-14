"use client";
import { LOADING_STATES, NavigationContext, useNavigationContext } from "@context/NavigationContext"
import gsap from "gsap";
import { useEffect, useRef, useContext } from "react";
import CircularSector, { circleEnter, circleExit, circleInit } from "@component/CircularSector";

export const CircleTransition = ({children} : {children : React.ReactNode}) => {
  const { loading, setLoading } = useContext(NavigationContext)
  const background = useRef<HTMLDivElement>(null);

  const _init = () => {
    console.log("Initalized Loading Component");
    /*Add your initial state here */
    gsap.set(background.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });
  };

  const _enter = () => {
    console.log("Performing Loading in");
    /*Add your page enter animation*/
    gsap.to(background.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.inOut",
    });
  };

  const _exit = () => {
    console.log("Performing Loading out");
    /*Add your page exit animations*/
    gsap.to(background.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        if (loading === LOADING_STATES.INIT) setLoading(LOADING_STATES.LOADED);
      },
    });
}
  };

  useEffect(() => {
    _init();
  }, []);

  useEffect(() => {
    loading === LOADING_STATES.INIT ? _exit() : null;
    loading === LOADING_STATES.LOADED ? _enter() : null;
    loading === LOADING_STATES.LOADING ? _exit() : null;
  }, [loading]);

  return (
    <CircleTransition>
        {children}
    </CircleTransition>
  );
};