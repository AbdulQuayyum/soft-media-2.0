import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { GoogleLogin, googleLogout } from '@react-oauth/google'

import Logo from '../Utilities/logo.png'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[30px] md:w-[40px] md:h-[40px] h-[30px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            height={40}
            width={40}
            layout="responsive"
          />
        </div>
      </Link>
    </div>
  )
}

export default Navbar
