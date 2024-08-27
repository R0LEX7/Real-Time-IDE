"use client"

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'


type Props = {
    isCreated : boolean
}

export default function Room({isCreated}: Props) {

    const router = useRouter()

    const [roomId, setRoomId] = useState<null | string>("")
    const [username, setUsername] = useState<null | string>("")

    const createRoomId = () => {
        const id = uuidv4()
        setRoomId(id)

    }

    useEffect(() => {
        if(!isCreated){
            createRoomId()
        }
    },[isCreated])

    const handleClick = () => {


        if (!roomId || roomId.trim() === ""  ) {

            toast.error("Invalid room id")
            return;
        }
        if(username?.length !== undefined && username?.length <3|| !username || username.trim() === ""){
            toast.error("Invalid Username (requires at least 3 characters)")
            return;

        }
            router.push(`/room/${roomId}/?username=${username}` )

    }


    const handleKeyEnter = (e : React.KeyboardEvent ) => {
      if(e.code ==="Enter"){
        handleClick()
      }
    }


  return (
    <div className='flex justify-center flex-col items-center w-full h-screen'>
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Room</CardTitle>
        <CardDescription>{!isCreated ? "Have an invite? join a" : "If you don`t have an invite then create a"} <Link href={!isCreated ?"/" : "/create_room"} className='underline'>room</Link></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="room">Room Id</Label>
              <Input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              id="room" placeholder="Enter Your Room Id"
              onKeyUp={handleKeyEnter}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
              onKeyUp={handleKeyEnter}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username" placeholder="Enter Your Username" />

            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">

        <Button onClick={handleClick}  onKeyUp={handleKeyEnter}>{ isCreated ?"Join Room" : "Create Room"}</Button>
      </CardFooter>

    </Card>
    </div>
  )
}
