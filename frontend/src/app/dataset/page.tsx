import  DataTable  from '@/components/app/dataTable';
import React from 'react';

export default function Page(){
  
  return (
    <div className='flex justify-center text-center'>
      
    <div className='p-4 w-[80%] dark:border-white border-black border-2 rounded-xl m-4'>
      <DataTable/>
    </div>
    </div>
  )
}
