import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'
import { TbError404 } from 'react-icons/tb'

interface IProps {
  text: string
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-8xl">
        <TbError404 />
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  )
}

export default NoResults
