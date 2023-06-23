import { createContext, useContext, useEffect, useState } from "react";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import axios from "axios";


interface IAuthContext {
  signIn(username: string, password: string): Promise<any>
  signOut(): Promise<any>,
  isLoggedIn: boolean,
}


const AuthContext = createContext<IAuthContext>({
  signIn: async () => { },
  signOut: async () => { },
  isLoggedIn: false
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export interface AuthProviderProps {
  children: any
}


export function AuthProvider({ children }: AuthProviderProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const session = useSession();

  const underUseEffectFunction = () => {
    setIsLoggedIn(session.status == "authenticated")

  }

  useEffect(underUseEffectFunction, [session.status]);

  const signIn = async (username: string, password: string) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_CORE_URL_API}/auth`, {
        username: username,
        password: password
      })
      const accessToken = await res.data.token
      const credential = await nextAuthSignIn('credentials', {
        accessToken,
        redirect: false
      })
      if (credential?.ok) {
        setIsLoggedIn(true)
        return credential
      } else {
        throw credential?.error
      }
    } catch (err) {
      throw err
    }
  }

  const signOut = async () => {
    await nextAuthSignOut({
      redirect: false
    })
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}