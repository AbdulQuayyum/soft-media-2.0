import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../../Utilities/Client'
import { TopicPostsQuery } from '../../../Utilities/Queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { Topic } = req.query

    const VideosQuery = TopicPostsQuery(Topic)

    const Videos = await Client.fetch(VideosQuery)

    res.status(200).json(Videos)
  }
}
