import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../../Utilities/Client'
import {
  SingleUserQuery,
  UserCreatedPostsQuery,
  UserLikedPostsQuery,
} from '../../../Utilities/Queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const query = SingleUserQuery(id)
    const userVideosQuery = UserCreatedPostsQuery(id)
    const userLikedVideosQuery = UserLikedPostsQuery(id)

    const User = await Client.fetch(query)
    const UserVideos = await Client.fetch(userVideosQuery)
    const UserLikedVideos = await Client.fetch(userLikedVideosQuery)

    const data = { User: User[0], UserVideos, UserLikedVideos }

    res.status(200).json(data)
  }
}
