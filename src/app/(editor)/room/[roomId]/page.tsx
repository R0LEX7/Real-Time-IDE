"use client";

import { useEffect, useState } from "react";
import { socket } from "@/socket";

import CodeEditor from '@/components/CodeEditor'
import Output from '@/components/Output'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import useIsDesktop from "@/hooks/useIsDesktop";
import MobileView from "@/components/MobileView";



type Props = {}

export default function page({}: Props) {

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  function  emitMsg  (){
    socket.emit("hello", "world");
  }



  const  IsDesktop = useIsDesktop()





  return (
   <>
    {IsDesktop ? (
      <div className='flex gap-3 h-screen'>

      <Sidebar socket={socket}/>

      <ResizablePanelGroup direction="vertical">
  <ResizablePanel defaultSize={75}><CodeEditor socket={socket}/></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><Output/></ResizablePanel>
</ResizablePanelGroup>
      </div>
    ) : (<MobileView/>)}

   </>

  )
}
