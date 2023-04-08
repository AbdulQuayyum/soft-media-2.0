import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'

import { BASE_URL } from '../../Utilities/Index'
import { Comments, LikeButton } from '../../Components/Index'
import { Video } from '../../../types'
import UseAuthStore from '../../Store/AuthStore'

interface IProps {
  PostDetails: Video
}

const Detail = ({ PostDetails }: IProps) => {
  const [Post, setPost] = useState(PostDetails)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false)
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false)
  const [Comment, setComment] = useState<string>('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const { UserProfile }: any = UseAuthStore()

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (Post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [Post, isVideoMuted])

  const handleLike = async (Like: boolean) => {
    if (UserProfile) {
      const res = await axios.put(`${BASE_URL}/api/Like`, {
        UserID: UserProfile._id,
        PostID: Post._id,
        Like,
      })
      setPost({ ...Post, Likes: res.data.Likes })
    }
  }

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (UserProfile) {
      if (Comment) {
        setIsPostingComment(true)
        const res = await axios.put(`${BASE_URL}/api/Post/${Post._id}`, {
          UserID: UserProfile._id,
          Comment,
        })

        setPost({ ...Post, Comments: res.data.Comments })
        setComment('')
        setIsPostingComment(false)
      }
    }
  }

  return (
    <>
      {Post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p className="cursor-pointer " onClick={() => router.back()}>
                <BiArrowBack className="text-white text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative">
              <div className="lg:h-[100vh] h-[60vh]">
                <video
                  ref={videoRef}
                  onClick={onVideoClick}
                  loop
                  src={Post?.Video?.asset.url}
                  className=" h-full cursor-pointer"
                ></video>
              </div>

              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!isPlaying && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                  </button>
                )}
              </div>
            </div>
            <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer">
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-3xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-3xl lg:text-4xl" />
                </button>
              )}
            </div>
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <Link href={`/Profile/${Post.PostedBy._id}`}>
                <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={Post.PostedBy.Image}
                  />
                  <div>
                    <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {Post.PostedBy.UserName.replace(/\s+/g, '')}{' '}
                      {/* <GoVerified className="text-blue-400 text-xl" /> */}
                      {Post.PostedBy.UserName === 'Abdul-Quayyum' ? (
                        <GoVerified className="text-blue-400 text-xl" />
                      ) : null}
                    </div>
                    <p className="text-md"> {Post.PostedBy.UserName}</p>
                  </div>
                </div>
              </Link>
              <div className="px-10">
                <p className=" text-md text-gray-600">{Post.Caption}</p>
              </div>
              <div className="mt-10 px-10">
                {UserProfile && (
                  <LikeButton
                    Likes={Post.Likes}
                    flex="flex"
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}
              </div>
              <Comments
                Comment={Comment}
                setComment={setComment}
                addComment={addComment}
                Comments={Post.Comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/Post/${id}`)

  return {
    props: { PostDetails: res.data },
  }
}

export default Detail
