import { createContext, useContext, useEffect, useState } from "react";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, useSession } from 'next-auth/react'
import axios from "axios";


interface IAuthContext {
  signIn(username: string, password: string): Promise<any>
  signOut(): Promise<any>,
  isLoggedIn: boolean,
  role: string;
}


const AuthContext = createContext<IAuthContext>({
  signIn: async () => { },
  signOut: async () => { },
  isLoggedIn: false,
  role: ""
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export interface AuthProviderProps {
  children: any
}


export function AuthProvider({ children }: AuthProviderProps) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState("")

  const session = useSession();

  const underUseEffectFunction = () => {
    setIsLoggedIn(session.status == "authenticated")
  }

  useEffect(underUseEffectFunction, [session.status]);

  const underUseEffectFunction2 = () => {
    setRole(session.data?.role ? session.data.role : "")
  }

  useEffect(underUseEffectFunction2, [session.data?.role]);


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
    <AuthContext.Provider value={{ signIn, signOut, isLoggedIn, role }}>
      {children}
    </AuthContext.Provider>
  )
}