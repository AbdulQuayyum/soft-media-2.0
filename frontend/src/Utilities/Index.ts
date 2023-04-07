import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const CreateOrGetUser = async (response: any, AddUser: any) => {
  var base64Url = response.credential.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  const { name, picture, sub } = JSON.parse(jsonPayload)

  const User = {
    _id: sub,
    _type: 'User',
    UserName: name,
    Image: picture,
  }

  AddUser(User)

  await axios.post(`${BASE_URL}/api/Auth`, User)
}
