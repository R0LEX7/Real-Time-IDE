import Room from '@/components/Room'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div><Room isCreated={false}/></div>
  )
}
