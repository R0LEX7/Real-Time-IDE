"use client"

import React, { useState } from 'react'
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

type Props = {}

interface IMember {
    socketId: string | number
    username: string
}

export default function Sidebar({}: Props) {
    const [members, setMembers] = useState<IMember[]>([
        { socketId: 1, username: "Rakesh Sharma" },
        { socketId: 2, username: "Prakash" },

        // Add more members as needed
    ])

    return (
        <Card className='w-[200px] h-screen flex flex-col'>
            <div className='flex-grow'>
                <CardHeader>
                    <CardTitle>Real Time IDE</CardTitle>
                    <CardDescription>Connected Members</CardDescription>
                </CardHeader>

                <CardContent className='flex flex-wrap justify-center gap-2 overflow-y-auto max-h-[calc(100vh-340px)]'>
                    {members && members.map((member) => (
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
            <Avatar name={member?.username} round="50px" size={50} />
            <p className='text-xs'>{member?.username}</p>
        </div>
    )
}
