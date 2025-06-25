import LabelCarousel from '@/components/app/labelCorousal';
import { Badge } from '@/components/ui/badge';
import React from 'react';

export default function Page(){
  return(
    <>
      <div className='flex justify-center items-center p-4 w-full'>
        
    <Badge className='text-2xl'>The Labels available are:</Badge>
      </div>
    <div className='w-full h-screen flex justify-center items-center'>
      
    <div className='flex justify-center text-center'>
      
    <LabelCarousel/>
    </div>
    </div>
    </>
  )
}