import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { BsPlay } from 'react-icons/bs'

import { Video } from '../../types'

interface IProps {
  post: Video
  isShowingOnHome?: boolean
}

const VideoCard: NextPage<IProps> = ({
  post: { Caption, PostedBy, Video, _id, Likes },
  isShowingOnHome,
}) => {
  return <div>VideoCard</div>
}

export default VideoCard
