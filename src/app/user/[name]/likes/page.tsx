import LikeTotalList from '@/components/my/LikeTotalList';
import React from 'react'

export default function LikesPage() {

    return (
        <div className='rounded-xl p-20 mx-auto text-white mt-6 border-white border-2 max-w-[1084px]'>
              <div className="w-full flex justify-center items-center flex-col">    
                <LikeTotalList />
              </div>
        </div>
    )
}
