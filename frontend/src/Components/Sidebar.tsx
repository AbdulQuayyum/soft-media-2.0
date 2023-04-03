import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { HiMenuAlt2 } from 'react-icons/hi'
import { MdCloseFullscreen } from 'react-icons/md'
import { ImCancelCircle } from 'react-icons/im'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { pathname } = useRouter()

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#aaa] rounded'

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded'
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <MdCloseFullscreen /> : <HiMenuAlt2 />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl">
                  <RxDashboard />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
