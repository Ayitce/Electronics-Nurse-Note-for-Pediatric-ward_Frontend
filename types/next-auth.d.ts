import { Task } from '@/domain/task';
import NextAuth, { DefaultAccount, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'


declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    role: string;
  }

  interface User {
    accessToken: string;
    role: string;
  }

}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken: string
    role: string;
  }
}
