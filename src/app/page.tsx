import MenuCard from '@/components/MenuCard'

const mainMenus : { title : string, img : string, link : string }[] = [
  { title : "검색", img : "/images/background/SSS급 죽어야 사는 헌터.png", link : "/search"},
  { title : "장르 별 순위", img :"/images/background/악역의 엔딩은 죽음뿐.png", link : "/genre"},
  { title : "전체 순위", img :"/images/background/현실 퀘스트.png", link : "/rank"},
  { title : "신작 웹툰", img :"/images/background/나노마신.png", link : "/new"},
];

export default function Home() {

  return (
    <div className={`flex items-center justify-center w-[100dvw] h-[100dvh] md:flex-row flex-col`}> 
      {
        mainMenus.map((menu, index)=>(
          <MenuCard key = {menu.img} menu = {menu} zIndex = {index*10}/>
        ))
      }  
    </div>
  )
}
