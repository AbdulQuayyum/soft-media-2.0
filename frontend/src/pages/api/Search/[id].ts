import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../../Utilities/Client'
import { SearchPostsQuery } from '../../../Utilities/Queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { id } = req.query

    const VideosQuery = SearchPostsQuery(id)

    const Videos = await Client.fetch(VideosQuery)

    res.status(200).json(Videos)
    res.end()
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
