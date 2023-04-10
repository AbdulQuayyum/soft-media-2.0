import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'
import { BsFillPlayFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'

import { BASE_URL } from '../../Utilities/Index'
import { Comments, LikeButton, SaveButton } from '../../Components/Index'
import { Video } from '../../types'
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

  const HandleLike = async (Like: boolean) => {
    if (UserProfile) {
      const res = await axios.put(`${BASE_URL}/api/Like`, {
        UserID: UserProfile._id,
        PostID: Post._id,
        Like,
      })
      setPost({ ...Post, Likes: res.data.Likes })
    }
  }

  const HandleSave = async (Save: boolean) => {
    if (UserProfile) {
      const res = await axios.put(`${BASE_URL}/api/Save`, {
        UserID: UserProfile._id,
        PostID: Post._id,
        Save,
      })
      setPost({ ...Post, Saves: res.data.Saves })
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
        <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
            <div className="absolute z-50 flex gap-6 opacity-90 top-6 left-2 lg:left-6">
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
                  className="h-full cursor-pointer "
                ></video>
              </div>

              <div className="absolute top-[45%] left-[40%]  cursor-pointer">
                {!isPlaying && (
                  <button onClick={onVideoClick}>
                    <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
                  </button>
                )}
              </div>
            </div>
            <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-3xl text-white lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-3xl text-white lg:text-4xl" />
                </button>
              )}
            </div>
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="mt-10 lg:mt-20">
              <Link href={`/Profile/${Post.PostedBy._id}`}>
                <div className="flex w-full gap-4 pl-10 mb-4 bg-white cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={Post.PostedBy.Image}
                  />
                  <div>
                    <div className="flex items-center justify-center gap-2 text-xl font-bold tracking-wider lowercase">
                      {Post.PostedBy.UserName.replace(/\s+/g, '')}{' '}
                      {/* <GoVerified className="text-xl text-blue-400" /> */}
                      {Post.PostedBy.UserName === 'Abdul-Quayyum Alao' ? (
                        <GoVerified className="text-xl text-blue-400" />
                      ) : null}
                    </div>
                    <p className="text-md"> {Post.PostedBy.UserName}</p>
                  </div>
                </div>
              </Link>
              <div className="px-10">
                <p className="text-gray-600 text-md">{Post.Caption}</p>
              </div>
              <div className="flex justify-between px-10 mt-10">
                {UserProfile && (
                  <>
                    <LikeButton
                      Likes={Post.Likes}
                      flex="flex"
                      HandleLike={() => HandleLike(true)}
                      HandleDislike={() => HandleLike(false)}
                    />
                    <SaveButton
                      Saves={Post.Saves}
                      flex="flex"
                      HandleSave={() => HandleSave(true)}
                      HandleUnSave={() => HandleSave(false)}
                    />
                  </>
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
