import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const User = req.body

      Client.createIfNotExists(User).then(() => {
        return res.status(200).json('Login successful')
      })
    }
  } catch (err) {
    return res.status(500).json({ error: 'failed to load data' })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
