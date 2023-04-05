import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const doc = req.body

      Client.createIfNotExists(doc).then(() => {
        res.status(200).json('Login successful')
      })
    }
  } catch (err) {
    console.error(err)
  }
}
