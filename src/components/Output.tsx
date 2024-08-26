"use client"

import React, { useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from './ui/button'
import { useCodeStore } from '@/store/store'


type Props = {}

export default function Output({}: Props) {

  const output = useCodeStore((state => state.output))

  useEffect(() => {
    console.log("output from output", output)
  }, [output])

  return (
    <div className='p-2'>
      <Button variant={'outline'}>Output</Button>
      <ScrollArea className='text-base p-3'>
        {output && output}
      </ScrollArea>
    </div>
  )
}
