import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import { BASE_URL } from '../../Utilities/Index'
import { IUser, Video } from '../../types'
import { NoResults, VideoCard } from '../../Components/Index'

interface IProps {
  data: {
    User: IUser
    UserVideos: Video[]
    UserLikedVideos: Video[]
  }
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true)
  const [videosList, setVideosList] = useState<Video[]>([])

  const activeBtnStyles =
    'bg-black text-white dark:text-black transition-all duration-500 dark:bg-white font-bold py-2 px-4 rounded-full w-22 outline-none'
  const notActiveBtnStyles =
    'bg-primary text-black transition-all duration-500 dark:text-white font-bold py-2 px-4 rounded-full w-22 outline-none'

  const { User, UserVideos, UserLikedVideos } = data
  const videos = showUserVideos ? activeBtnStyles : notActiveBtnStyles
  const liked = !showUserVideos ? activeBtnStyles : notActiveBtnStyles

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(UserVideos)
      } else {
        setVideosList(UserLikedVideos)
      }
    }

    fetchVideos()
  }, [showUserVideos, UserLikedVideos, UserVideos])

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center justify-center mb-7 md:gap-2">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            className="rounded-full"
            src={User?.Image}
            alt="User-profile"
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center gap-2 text-sm font-bold tracking-wider lowercase md:text-xl">
            <p className="font-bold capitalize md:text-2xl text-md">
              {' '}
              {User?.UserName}
            </p>
            <div className='flex items-center'>
            <span>@{User?.UserName.replace(/\s+/g, '')} </span>
            {/* <GoVerified className='text-blue-400 md:text-xl text-md' /> */}
            {User?.UserName === 'Abdul-Quayyum Alao' ? (
              <GoVerified className="text-blue-400 md:text-xl text-md" />
            ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center w-full gap-10 mt-10 mb-10">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} Post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { UserID },
}: {
  params: { UserID: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/Profile/${UserID}`)

  return {
    props: { data: res.data },
  }
}
export default Profile
