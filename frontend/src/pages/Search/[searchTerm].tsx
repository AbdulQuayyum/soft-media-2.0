import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import axios from 'axios'

import { BASE_URL } from '../../Utilities/Index'
import { IUser, Video } from '../../../types'
import { NoResults, VideoCard } from '../../Components/Index'
import UseAuthStore from '../../Store/AuthStore'

const Search = ({ Videos }: { Videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false)
  const { AllUsers }: { AllUsers: IUser[] } = UseAuthStore()

  const router = useRouter()
  const { SearchTerm }: any = router.query

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const searchedAccounts = AllUsers?.filter((User: IUser) =>
    User.UserName.toLowerCase().includes(SearchTerm),
  )

  return (
    <div className="w-full  ">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          onClick={() => setIsAccounts(true)}
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((User: IUser, idx: number) => (
              <Link key={idx} href={`/Profile/${User._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="User-profile"
                      src={User.Image}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {User.UserName}
                        {/* <GoVerified className="text-blue-400" /> */}
                        {User.UserName === 'Abdul-Quayyum' ? (
                          <GoVerified className="text-blue-400" />
                        ) : null}
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {User.UserName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${SearchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {Videos.length ? (
            Videos.map((Post: Video, idx: number) => (
              <VideoCard Post={Post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${SearchTerm}`} />
          )}
        </div>
      )}
    </div>
  )
};

export const getServerSideProps = async ({
  params: { SearchTerm },
}: {
  params: { SearchTerm: string }
}) => {
  const res = await axios.get(`${BASE_URL}/api/Search/${SearchTerm}`)

  return {
    props: { Videos: res.data },
  }
}

export default Search;
