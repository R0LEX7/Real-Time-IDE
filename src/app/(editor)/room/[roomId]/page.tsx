import CodeEditor from '@/components/CodeEditor'
import Output from '@/components/Output'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"



type Props = {}

export default function page({}: Props) {




  return (
    <div className='flex gap-3 h-screen'>
      <Sidebar/>

      <ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={75}><CodeEditor/></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><Output/></ResizablePanel>
</ResizablePanelGroup>
      </div>

  )
}
