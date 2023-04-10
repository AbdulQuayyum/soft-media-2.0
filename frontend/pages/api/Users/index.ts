import type { NextApiRequest, NextApiResponse } from 'next'

import { AllUsersQuery } from '../../../Utilities/Queries'
import { Client } from '../../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await Client.fetch(AllUsersQuery())

  // console.log(data)

  if (data) {
    res.status(200).json(data)
    res.end()
  } else {
    res.json([])
    res.end()
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
