import MenuCard from '@/components/MenuCard'
import { mainMenus3 as mainMenus } from '@/mock/mainMenu'
import dynamic from 'next/dynamic'


export default function Home() {
  return (
    <div className='flex flex-col w-[100dvw] h-[100dvh] md:flex-row'> 
      {
        mainMenus.map((menu, index)=>(
          <MenuCard key = {menu.title} menu = {menu} menuIndex = {index} />
        ))
      }  
    </div>
    // <div className={`grid grid-cols-4 w-[100dvw] h-[100dvh] md:grid-rows-4 flex-col`}> 
    //   {
    //     mainMenus2.map((menu, index)=>(
    //       <MenuCard2 key = {menu.title} menu = {menu} menuIndex = {index} />
    //     ))
    //   }  
    // </div>
  )
}

// items-center justify-center