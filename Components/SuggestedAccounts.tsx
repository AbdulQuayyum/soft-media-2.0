import React, { useEffect } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import { IUser } from '../types'

interface IProps {
  FetchAllUsers: () => void
  AllUsers: IUser[]
}

const SuggestedAccounts: NextPage<IProps> = ({ FetchAllUsers, AllUsers }) => {
  useEffect(() => {
    FetchAllUsers()
  }, [FetchAllUsers])

  const Users = AllUsers.sort(() => 0.5 - Math.random()).slice(
    0,
    AllUsers.length,
  )

  return (
    <div className="pb-4 border-gray-200 xl:border-b-2">
      <p className="hidden m-3 mt-4 font-semibold text-gray-500 xl:block">
        Suggested accounts
      </p>
      <div>
        {Users?.slice(0, 6).map((User: IUser) => (
          <Link href={`/Profile/${User._id}`} key={User._id}>
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer hover:bg-primary">
              <div className="w-8 h-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={User.Image}
                  alt="User-profile"
                />
              </div>

              <div className="hidden xl:block">
                <p className="flex items-center gap-1 font-bold lowercase text-md text-primary">
                  {User.UserName.replace(/\s+/g, '')}{' '}
                  {/* <GoVerified className='text-blue-400' /> */}
                  {User.UserName === 'Abdul-Quayyum Alao' ? (
                    <GoVerified className="text-blue-400" />
                  ) : null}
                </p>
                <p className="text-xs text-gray-400 capitalize">
                  {User.UserName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts
