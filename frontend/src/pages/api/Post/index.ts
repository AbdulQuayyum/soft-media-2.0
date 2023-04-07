import type { NextApiRequest, NextApiResponse } from 'next'

import { AllPostsQuery } from '../../../Utilities/Queries'
import { Client } from '../../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const query = AllPostsQuery()

    const data = await Client.fetch(query)

    res.status(200).json(data)
    res.end()
  } else if (req.method === 'POST') {
    const doc = req.body

    Client.create(doc).then(() => {
      res.status(200).json('Video created')
      res.end()
    })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
