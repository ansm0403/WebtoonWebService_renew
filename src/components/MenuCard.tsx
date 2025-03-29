'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'
import { MouseEvent } from 'react'

export default function MenuCard({
    menu,
    menuIndex
} : {
    menu : { title : string, img : string[], link : string },
    menuIndex : number
  }) {

    const initialData =  {
      검색 : false,
      장르 : false,
      전체 : false,
      신작 : false
    }

    const [ menuHover , setMenuHover ] = useState<{[key : string] : boolean}>(initialData);

    const handleEnterMenu = ( e : MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const title = e.currentTarget?.dataset.menu as string;
      setMenuHover((prev) => {
          const newMenus = { ...prev };
          newMenus[title] = true;
          return newMenus
      })
      console.log("엔터", title);
    }

    const handleLeaveMenu = (e : MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setMenuHover(initialData)
      console.log("리브", e.currentTarget.dataset.menu);
    }

    // 1. 모든 메뉴가 호버되지 않은 상태에서는 4개의 메뉴를 전부 보여준다.
    // 2. 호버된 메뉴와 그 메뉴에 딸려있는 나머지 3개의 추가 표지를 화면에 보여준다.
    // 3. 기본적으로 호버되지 않은 상태에서는 나머지 3개의 추가 표지는 화면에 보이지 않는다.

    function getMenuStyles(index : number, menuTitle : string){
      console.log("타이틀 : ", menuTitle);
      console.log(menuTitle ,"호버 : ", menuHover[menuTitle]);
      return `
      relative
      flex  justify-center items-center 
      max-w-[1500px] min-w-[200px] h-[100dvh] 
      overflow-hidden 
      transition-transform
      ${ 
        (menuIndex !== index && menuHover[menuTitle] === false) ||
          (checkAnyMenuIsHover(menuHover) && menuIndex === index && menuHover[menuTitle] === false) 
            ? `hidden` 
            : ``
      } 
      
      `
    }

    // (menuIndex !== index && !menuHover[menuTitle]) || (!menuHover[menuTitle] && checkAnyMenuIsHover(menuHover) )

    // menuIndex : 메인 메뉴에 배치된 대표 이미지들의 인덱스
    // index : 같은 menu에 있는 4가지 표지들의 인덱스.
    // menuHover[menuTitle] : menuTitle 이라는 메뉴가 호버됐는지에 대한 여부
    
    // true : 하나라도 호버된 상태, false : 어떠한 메뉴도 호버되지 않음.
    function checkAnyMenuIsHover(menuHover : {[key : string] : boolean}){
      return Boolean(Object.values(menuHover).filter(menu => menu === true).length);
    }

  return (
    <div>
    {
      menu.img.map((img, index)=>{
        const menuTitle = menu.title.split(" ")[0]
        return (
          <div 
            key = {img}
            data-menu = {menuTitle} 
            className= {getMenuStyles(index, menuTitle)}
            onMouseEnter={(e) => {
              return index === menuIndex ?
              handleEnterMenu(e) : null;
            }}
            onMouseLeave={(e) => {
              return index === menuIndex ?
              handleLeaveMenu(e) : null;
            }}
          >
            <Link href = {menu.link} className='' >
              <Image
                className="relative top-[200px] md:top-[0px] opacity-30 hover:opacity-100 transition-opacity  min-w-[100dvh] w-[100dvw]"
                alt = {menu.title} 
                src = {img}
                width = {1500} 
                height={2000} 
              />
            </Link>
            <div className='absolute text-white font-bold text-[3dvh]'>{menu.title}</div>
        </div>
        )
      })
    }
   
    </div>
  )
}

