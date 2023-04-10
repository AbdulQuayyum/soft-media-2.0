import React, { useEffect, useState } from 'react'
import { CgBookmark } from 'react-icons/cg'
import { NextPage } from 'next'
import UseAuthStore from '../Store/AuthStore'

interface IProps {
  Saves: any
  flex: string
  HandleSave: () => void
  HandleUnSave: () => void
}

const SaveButton: NextPage<IProps> = ({
  Saves,
  flex,
  HandleSave,
  HandleUnSave,
}) => {
  const [alreadySaved, setAlreadySaved] = useState(false)
  const { UserProfile }: any = UseAuthStore()
  let filterSaves = Saves?.filter((item: any) => item._ref === UserProfile?._id)

  useEffect(() => {
    if (filterSaves?.length > 0) {
      setAlreadySaved(true)
    } else {
      setAlreadySaved(false)
    }
  }, [filterSaves, Saves])

  return (
    <div className={`${flex} gap-6`}>
      <div className="flex flex-col items-center justify-center mt-4 cursor-pointer">
        {alreadySaved ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-blue-700 "
            onClick={HandleUnSave}
          >
            <CgBookmark className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="p-2 rounded-full bg-primary md:p-4 "
            onClick={HandleSave}
          >
            <CgBookmark className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="font-semibold text-md ">{Saves?.length || 0}</p>
      </div>
    </div>
  )
}

export default SaveButton
