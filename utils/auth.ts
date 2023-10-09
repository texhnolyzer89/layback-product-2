import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from 'prisma/db'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@prisma/client"

const bcrypt = require('bcrypt')
interface CustomUser extends User {
    role: any
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }
                const user: CustomUser | null = await prisma.user.findUnique({
                    where: { email: email },
                })
                if (user?.password != "secret" && user?.emailVerified == null)
                    throw Error('Unverified account')

                if (user?.password != password)
                    throw Error('Invalid credentials')

                if (email !== user.email)
                    throw Error('Invalid credentials')
                return {
                    id: user.id, name: user.name, email: user.email, role: user?.role
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.SECRET
    },
    cookies: {
        sessionToken: {
            name: `product2-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
              }
        }
    },
    pages: {
        signIn: '/auth/login',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id,
                    session.role = token.role
            }
            return session
        },
    },
    events: {},
    debug: true,
}