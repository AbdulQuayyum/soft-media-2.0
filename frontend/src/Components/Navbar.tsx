import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import cogoToast from 'cogo-toast'

import { CreateOrGetUser } from '../Utilities/Index'
import { IUser } from '../../types'
import Logo from '../Utilities/logo.png'
import UseAuthStore from '../Store/AuthStore'

const Navbar = () => {
  const [User, setUser] = useState<IUser | null>()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const { UserProfile, AddUser, RemoveUser } = UseAuthStore()

  useEffect(() => {
    setUser(UserProfile)
  }, [UserProfile])

  const HandleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/Search/${searchValue}`)
    }
  }

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/">
        <div className="w-[30px] md:w-[40px] md:h-[40px] h-[30px]">
          <Image className="cursor-pointer" src={Logo} alt="logo" />
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={HandleSearch}
          className="absolute bg-white md:static top-10 -left-20"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={HandleSearch}
            className="absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {User ? (
          <div className="flex items-center gap-5 md:gap-10">
            <Link href="/Upload">
              <button className="flex items-center gap-2 px-4 py-3 font-semibold border-2 rounded-full bg-primary md:px-8 text-md">
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {User.Image && (
              <Link href={`/Profile/${User._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={User.Image}
                    alt="User"
                    width={40}
                    height={40}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className="p-3 border-2 rounded-full shadow-md outline-none cursor-pointer "
              onClick={() => {
                googleLogout()
                RemoveUser()
                localStorage.clear()
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={response => { CreateOrGetUser(response, AddUser)}}
            onError={() => {
              cogoToast.error('Please try again', {
                position: 'top-right',
                heading: 'Login Failed',
              })
            }}
            shape="circle"
            size="large"
            text="continue_with"
            theme="filled_black"
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
