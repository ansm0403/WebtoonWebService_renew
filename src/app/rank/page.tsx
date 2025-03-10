
import React from 'react'

import Pagination from '@/component/shared/Pagination';


export default function RankPage({ params : { page = '1' }}) {
  
  return (
    <>
      <WebtoonList page = {page}/>
      <Pagination />
    </>
  )
}
 