import type { NextApiRequest, NextApiResponse } from 'next'

import { PostDetailQuery } from '../../../Utilities/Queries'
import { Client } from '../../../Utilities/Client'
import { uuid } from 'uuidv4'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { id } = req.query
    const query = PostDetailQuery(id)

    const data = await Client.fetch(query)

    res.status(200).json(data[0])
    res.end()
  } else if (req.method === 'PUT') {
    const { Comment, UserID } = req.body

    const { id }: any = req.query

    const data = await Client.patch(id)
      .setIfMissing({ Comments: [] })
      .insert('after', 'Comments[-1]', [
        {
          Comment,
          _key: uuid(),
          PostedBy: { _type: 'PostedBy', _ref: UserID },
        },
      ])
      .commit()

    res.status(200).json(data)
    res.end()
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
