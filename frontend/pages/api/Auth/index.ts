import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const User = req.body

    // console.log(User)

    Client.createIfNotExists(User).then(() => {
      res.status(200).json('Login successful')
      res.end()
    })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
