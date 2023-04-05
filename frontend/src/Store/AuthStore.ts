import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

import { BASE_URL } from '../Utilities/Index'

const AuthStore = (set: any) => ({
  UserProfile: null,
  AllUsers: [],

  AddUser: (User: any) => set({ UserProfile: User }),
  RemoveUser: () => set({ UserProfile: null }),

  FetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/Users`)

    set({ AllUsers: response.data })
  },
})

const UseAuthStore = create(
  persist(AuthStore, {
    name: 'auth',
  }),
)

export default UseAuthStore
