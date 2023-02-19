import { createContext, useContext } from 'react'

type User = {
  user: {
    name: string
    email: string
    image: string
    role: string
  }
}
export const LoggedInContext = createContext<User>({
  user: {
    name: '',
    email: '',
    image: '',
    role: '',
  },
})

export const useLoggedInContext = () => {
  return useContext(LoggedInContext)
}
