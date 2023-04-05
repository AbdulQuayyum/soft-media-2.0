import type { NextApiRequest, NextApiResponse } from 'next'

import { Client } from '../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const User = req.body

  Client.createIfNotExists(User).then(() => {
    res.status(200).json('Login successful')
  })
}