import React from 'react'
import axios from 'axios'
import Head from 'next/head'

import { BASE_URL } from '../Utilities/Index'
import { NoResults, VideoCard } from '../Components/Index'
import { Video } from '../types'

interface IProps {
  Videos: Video[]
}

const Home = ({ Videos }: IProps) => {
  return (
    <>
      <Head>
        <title>Soft-Media v2 - Your Videos Social Media</title>
        <meta
          name="description"
          content="A social media web application (Exclusively for Videos) where Videos can be viewed, uploaded and downloaded."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <div className="flex flex-col h-full gap-10 videos">
        {Videos?.length ? (
          Videos?.map((Video: Video) => (
            <VideoCard Post={Video} isShowingOnHome key={Video._id} />
          ))
        ) : (
          <NoResults text={`No Videos`} />
        )}
      </div>
    </>
  )
}

export default Home

export const getServerSideProps = async ({
  query: { Topic },
}: {
  query: { Topic: string }
}) => {
  let response = await axios.get(`${BASE_URL}/api/Post`)

  if (Topic) {
    response = await axios.get(`${BASE_URL}/api/Discover/${Topic}`)
  }

  return {
    props: { Videos: response.data },
  }
}
