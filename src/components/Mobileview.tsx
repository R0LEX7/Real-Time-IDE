"use client"
import React, { useEffect } from 'react'
import  Lottie  from 'lottie-react';
import desktopAnimation from '../../desktopanimation.json'
import { useRouter } from 'next/navigation';
import useIsDesktop from '@/hooks/useIsDesktop';

type Props = {}

export default function ({}: Props) {

    const router = useRouter()

    const  IsDesktop = useIsDesktop()

  useEffect(() => {
    if(IsDesktop){
        router.back()
    }

  }, [IsDesktop]);

  return (
    <div className='w-full h-full flex  items-center flex-col '>
    <Lottie
        animationData={desktopAnimation}
        loop={true} // Set to true if you want it to loop
        style={{ height: 400, width: 600  , marginTop : 100}} // Adjust the size as needed
      />
      <h3>Switch to Desktop for IDE</h3>

    </div>
  )
}
