import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { FaRegCommentDots } from 'react-icons/fa'

import { IUser } from '../types'
import UseAuthStore from '../Store/AuthStore'

interface IProps {
  isPostingComment: Boolean
  Comment: string
  setComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void
  Comments: IComment[]
}

interface IComment {
  Comment: string
  length?: number
  _key: string
  PostedBy: { _ref?: string; _id?: string }
}

const Comments = ({
  Comment,
  setComment,
  addComment,
  Comments,
  isPostingComment,
}: IProps) => {
  const { AllUsers, UserProfile }: any = UseAuthStore()

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {Comments?.length > 0 ? (
          Comments?.map((item: IComment, idx: number) => (
            <>
              {AllUsers?.map(
                (User: IUser) =>
                  User._id === (item.PostedBy._ref || item.PostedBy._id) && (
                    <div className="items-center p-2 " key={idx}>
                      <Link href={`/Profile/${User._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={User.Image}
                              alt="User-profile"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {User.UserName}{' '}
                            {/* <GoVerified className="text-blue-400" /> */}
                            {User.UserName === 'Abdul-Quayyum Alao' ? (
                              <GoVerified className="text-blue-400" />
                            ) : null}
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.Comment}
                        </p>
                      </div>
                    </div>
                  ),
              )}
            </>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-8xl">
              <FaRegCommentDots />
            </p>
            <p className="text-2xl text-center">
              No Comments Yet! Be First to add a Comment.
            </p>
          </div>
        )}
      </div>
      {UserProfile && (
        <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10 ">
          <form onSubmit={addComment} className="flex flex-wrap gap-4">
            <Link href={`/Profile/${UserProfile._id}`}>
              <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={UserProfile.Image}
                alt="User-profile"
              />
            </Link>
            <input
              value={Comment}
              onChange={(e) => setComment(e.target.value.trim())}
              className="flex-1 border-2 border-gray-100 outline-none rounded-2xl focus:border-gray-300 px-6 py-2 text-md font-medium w-[250px] md:w-[700px] lg:w-[350px] focus:outline-none focus:border-2"
              placeholder="Add a comment.."
            />
            <button
              className="px-6 py-2 text-base font-semibold text-white transition-all duration-500 bg-blue-700 rounded-full outline-none text-md dark:text-black dark:bg-white"
              onClick={addComment}
            >
              {isPostingComment ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
