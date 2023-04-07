import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'

import { Client } from '../../../Utilities/Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { UserID, PostID, Like } = req.body

    const data = Like
      ? await Client.patch(PostID)
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: uuid(),
              _ref: UserID,
            },
          ])
          .commit()
      : await Client.patch(PostID)
          .unset([`Likes[_ref=="${UserID}"]`])
          .commit()

    res.status(200).json(data)
    res.end()
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}
