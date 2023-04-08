import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'

import { BASE_URL } from '../../Utilities/Index'
import { IUser, Video } from '../../../types'
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

  const { User, UserVideos, UserLikedVideos } = data
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

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
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            className="rounded-full"
            src={User.Image}
            alt="User-profile"
          />
        </div>

        <div>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{User.UserName.replace(/\s+/g, '')} </span>
            {/* <GoVerified className='text-blue-400 md:text-xl text-md' /> */}
            {User.UserName === 'Abdul-Quayyum' ? (
              <GoVerified className="text-blue-400 md:text-xl text-md" />
            ) : null}
          </div>
          <p className="text-sm font-medium"> {User.UserName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
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
        <div className="flex gap-6 flex-wrap md:justify-start">
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
