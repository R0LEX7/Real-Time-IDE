"use client"

import { Socket } from "socket.io-client";
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Avatar from 'react-avatar'
import { useSearchParams , useParams } from 'next/navigation'
import { ACTIONS } from "@/constant";
import toast from "react-hot-toast";

type Props = {

        socket: Socket;

}

interface IMember {
    socketId: string | number
    username: string
}

export default function Sidebar({socket} : Props) {
    const [members, setMembers] = useState<IMember[]>([])

    const searchParams = useSearchParams()
    const {roomId} = useParams()
    const username = searchParams.get('username')


    useEffect(() => {
        socket.emit(ACTIONS.JOIN , {username , roomId} )
        socket.on(ACTIONS.JOINED , ({allClients , username , socketId}) => {
            console.log("user connected" , username , allClients)
            toast.success(`${username} joined the room`)
            setMembers(allClients)
        })

    // Listening for disconnect
    socket.on(ACTIONS.DISCONNECTED , ({socketId , username}) => {
        toast.success(`${username} left the room`)
        setMembers((prev) => {
            return prev.filter((client) => client.socketId !== socketId)

        })
    })

    },[])

    console.log("members" , members)

    return (
        <Card className='w-[200px] h-screen flex flex-col'>
            <div className='flex-grow'>
                <CardHeader>
                    <CardTitle>Real Time IDE</CardTitle>
                    <CardDescription>Connected Members</CardDescription>
                </CardHeader>

                <CardContent className='flex flex-wrap justify-center gap-2 overflow-y-auto max-h-[calc(100vh-340px)]'>
                    {members && members.length > 0 && members.map((member) => (
                        <MemberComp key={member.socketId} member={member} />
                    ))}
                </CardContent>
            </div>

            <CardFooter className="flex flex-col gap-2 p-4">
                <Button variant="outline" className='w-full'>Copy Room Id</Button>
                <Button className='w-full'>Leave Room</Button>
            </CardFooter>
        </Card>
    )
}

interface IMemberProp {
    member: IMember
}

const MemberComp = ({ member }: IMemberProp) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Avatar name={member?.username} round="50px" size={"50"} />
            <p className='text-xs'>{member?.username}</p>
        </div>
    )
}
