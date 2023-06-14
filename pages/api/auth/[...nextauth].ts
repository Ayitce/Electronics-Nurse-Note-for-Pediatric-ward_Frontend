/* import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'auth',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                accessToken: {
                    label: 'accessToken',
                    type: 'string',
                }
            },
            async authorize(credentials, req) {
                const accessToken = credentials?.accessToken || ""
                try {
                    //what's this
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_CORE_URL_API}/v1/user`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.data.data.roles === "patient") {
                        return { id: accessToken, accessToken }
                    } else {
                        throw new Error("Unauthorized role.")
                    }
                } catch (err) {
                    throw err
                }

            }
        }),
    ],
    secret: process.env.NEXT_PUBLIC_AUTH_JWT_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 600 * 24 * 30,
    },
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        jwt: async ({ token, user, profile, account }) => {
            if (user) {
                token.accessToken = user.accessToken
            }
            return token
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken

            return session
        },
    },

    // Enable debug messages in the console if you are having problems
    debug: true,
}

export default NextAuth(authOptions)
 */