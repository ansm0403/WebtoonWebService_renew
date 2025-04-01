import MenuCard from '@/components/MenuCard'
import MenuCard2 from '@/components/MenuCard2'
import { mainMenus, mainMenus2 } from '@/mock/mainMenu'

export default function Home() {

  return (
    <div className={`grid grid-cols-4 w-[100dvw] h-[100dvh] md:grid-rows-4 flex-col`}> 
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